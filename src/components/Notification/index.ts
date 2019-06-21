import { createContext, createRef, useContext } from 'react';
import ReactNotification from 'react-notifications-component';
import customStyle from '!isomorphic-style-loader!css-loader?modules=global!./custom.css'; // eslint-disable-line import/no-unresolved

const isMaybeMobile = () => {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const x = w.innerWidth || e.clientWidth || g.clientWidth;
  return x < 768;
};

type NoitficationTypes = 'success' | 'danger' | 'info' | 'default' | 'warning';

// @ts-ignore
const notifContainerRef = createRef<ReactNotification>();
const addNotification = (options: {
  message: string;
  title?: string;
  type?: NoitficationTypes;
}) => {
  const isMobile = isMaybeMobile();

  if (
    notifContainerRef.current == null ||
    typeof notifContainerRef.current.addNotification !== 'function'
  )
    return;

  notifContainerRef.current.addNotification({
    type: 'success',
    insert: 'top',
    container: isMobile ? 'bottom-left' : 'top-right',
    animationIn: ['animated faster fadeIn'],
    animationOut: ['animated faster fadeOut'],
    slidingEnter: {
      cubicBezier: 'ease-out',
      duration: 200,
    },
    slidingExit: {
      cubicBezier: 'ease-in',
      duration: 200,
    },
    dismiss: { duration: 8000 },
    dismissable: { click: true },
    ...options,
  });
};

const NotifContext = createContext({
  notifContainerRef,
  addNotification,
});

export const useNotif = () => useContext(NotifContext);
export const notifStyles = [customStyle];
