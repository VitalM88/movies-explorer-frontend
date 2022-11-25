import './InfoTip.css';
import Preloader from '../Preloader/Preloader'
import {
  notFoundText,
  errorText,
} from '../../utils/constans.js'

function InfoTip({ notFound, isLoading, isError }) {
  return (
    <section className="info-tip">
      {
        isLoading ? (
          <>
            <Preloader />
          </>
        ) : (isError ? (
          <p className = "info-tip__text">
            {errorText}
          </p>
        ) : ( notFound ? (
          <p className = "info-tip__text">
            {notFoundText}
          </p>
        ) : ""
        ))
      }
    </section>
  );
}

export default InfoTip;