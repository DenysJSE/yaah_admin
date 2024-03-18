import './NotFoundPage.css'
import NotFound from 'assets/images/notFound.png';
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
      <img src={NotFound} alt='ghostIcon' className='not-found-page-image' />
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