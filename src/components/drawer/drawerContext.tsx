import React, { createContext, useContext, useState, ReactNode } from 'react';
import RightPanel from '.';

type DrawerContextType = {
	drawerProps: any;
	openDrawer: (props: any) => void;
	closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error('useDrawer must be used within a DrawerProvider');
	}
	return context;
};

type DrawerProviderProps = {
	children: ReactNode;
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
	const [drawerProps, setDrawerProps] = useState<any | null>(null);

	const openDrawer = (props: any) => {
		setDrawerProps(props);
	};

	const closeDrawer = () => {
		setDrawerProps(null);
	};

	return (
		<DrawerContext.Provider value={{ drawerProps, openDrawer, closeDrawer }}>
			{children}
			{drawerProps && <RightPanel {...drawerProps} onClose={closeDrawer} />}
		</DrawerContext.Provider>
	);
};
