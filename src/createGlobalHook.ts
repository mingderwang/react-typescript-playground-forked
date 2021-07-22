import { useState, useEffect, useMemo } from 'react';
import ee from 'event-emitter';
// tslint:disable-next-line: no-any
const allData: { [key: string]: { data: any } } = {};
const eventEmitter = ee();

type ProxiedActions = {
// tslint:disable-next-line: no-any
	[key: string]: (() => Promise<void>) | ((...args: any[]) => Promise<void>);
};

function createGlobalHook<
	// tslint:disable-next-line: no-any
	T = any,
	A =
	| {
	// tslint:disable-next-line: no-any
		[key: string]: (() => Promise<T>) | ((...args: any[]) => Promise<T>);
	}
	| undefined
>({
	storeName,
	initialData,
	actions
}: {
	storeName: string;
	initialData: T;
	actions?: A;
}): () => [T, (data: T) => void, ProxiedActions] {
	allData[storeName] = { data: initialData };
	return () => {
		const [state, setLocalState] = useState<{ data: T }>(allData[storeName]);
		function setState(data: T) {
			eventEmitter.emit(storeName, data);
		}
		const proxiedActions = useMemo<ProxiedActions>(() => {
			let returnActions: ProxiedActions = {};
			if (actions) {
				const keys = Object.keys(actions);
				for (const key of keys) {
					console.log('key', key);
					console.log('rA', returnActions);
					returnActions[key] = async (args) => {
						console.log(args);
						const newState = await actions[key].apply(null, [args]);
						setState(newState);
						return newState;
					};
				}
			}
			return returnActions;
		}, []);
		useEffect(() => {
			function onChange(data: T) {
				allData[storeName] = { data: { ...allData[storeName].data, ...data } };
				setLocalState(allData[storeName]);
			}
			eventEmitter.on(storeName, onChange);
			return () => {
				eventEmitter.off(storeName, onChange);
			};
		}, []);
		return [state.data, setState, proxiedActions];
	};
}

export default createGlobalHook;
