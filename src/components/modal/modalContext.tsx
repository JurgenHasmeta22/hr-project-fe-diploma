import React, { createContext, useContext, useState, ReactNode } from 'react';
import Modal from '.';

type ModalContextType = {
	modalProps: any;
	openModal: (props: any) => void;
	closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};

type ModalProviderProps = {
	children: ReactNode;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [modalProps, setModalProps] = useState<any | null>(null);

	const openModal = (props: any) => {
		setModalProps(props);
	};

	const closeModal = () => {
		setModalProps(null);
	};

	return (
		<ModalContext.Provider value={{ modalProps, openModal, closeModal }}>
			{children}
			{modalProps && <Modal {...modalProps} onClose={closeModal} />}
		</ModalContext.Provider>
	);
};
