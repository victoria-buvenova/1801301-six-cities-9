import { ChangeEvent, Fragment } from 'react';
import { Response } from '../../constants';

type StarRatingProps = {
  value: string,
  id: string,
  title: string,
  status: Response,
  fieldChangeHandle: (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
};

function StarRating({ id, title, value, status, fieldChangeHandle }: StarRatingProps): JSX.Element {
  return (
    <Fragment>
      <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value={value} id={id} type="radio" />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}

export default StarRating;
