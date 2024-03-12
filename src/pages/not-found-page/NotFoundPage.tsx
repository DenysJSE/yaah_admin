import './NotFoundPage.css'
import Ghost from 'assets/images/ghost.png';
import Button from 'components/button.tsx';

interface INotFoundPage {
  extraMessage?: string;
}

function NotFoundPage({ extraMessage }: INotFoundPage) {
  const handleGoBack = () => {
    history.back()
  }

  return (
    <div className='not-found-page'>
      <img src={Ghost} alt='ghostIcon' className='not-found-page-ghost-image' />
      <h1 className='not-found-page-title'>Whoops!</h1>
      <p className='not-found-page-description'>
        We could not find the page you were looking for!
      </p>
      <p className='not-found-page-description'>{extraMessage}</p>
      <div className='not-found-page-button' onClick={handleGoBack}>
        <Button text={'Go Back'} />
      </div>
    </div>
  );
}

export default NotFoundPage