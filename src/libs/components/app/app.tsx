import { Main } from '../main/main';
import { Layout as AntLayout } from 'antd';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Outlet } from 'react-router-dom';
import '~/assets/css/scaffolding.scss';
import { HistoryModal } from '~/libs/components/history-modal/history-modal.tsx';
import { useHistoryModalContext } from '~/libs/hooks/use-history-modal-context.hook.tsx';
import { CSSTransition } from 'react-transition-group';
import { useCallback, useRef } from 'react';
import styles from '../history-modal/styles.module.scss';
import { AuthModal } from '~/libs/components/auth-modal/auth-modal.tsx';
import { useSignInModalContext } from '~/libs/hooks/use-sign-in-modal-context.hook.tsx';
function App() {
  const signInModalContext = useSignInModalContext();
  const historyModalContext = useHistoryModalContext();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseHistoryModal = useCallback(() => {
    historyModalContext.setShowHistoryModal(false);
  }, [historyModalContext.setShowHistoryModal]);

  return (
    <AntLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <CSSTransition
        in={historyModalContext.showHistoryModal}
        nodeRef={modalRef}
        classNames={{
          enter: styles.modalRootEnter,
          enterActive: styles.modalRootEnterActive,
          exit: styles.modalRootExit,
          exitActive: styles.modalRootExitActive,
        }}
        timeout={200}
        unmountOnExit
      >
        <HistoryModal onClose={handleCloseHistoryModal} ref={modalRef} />
      </CSSTransition>
      <AuthModal
        setIsOpen={signInModalContext.setIsSignInModalOpen}
        handleSubmit={signInModalContext.handleSubmitSignInForm}
        isOpen={signInModalContext.isSignInModalOpen}
      />
    </AntLayout>
  );
}

export { App };
