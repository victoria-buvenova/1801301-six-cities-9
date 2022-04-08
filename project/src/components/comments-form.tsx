import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Response } from '../constants';
import { getCurrentProperty } from '../selectors/get-current-property';
import { getReviewPostStatus } from '../selectors/get-review-post-status';
import { addReviewAction } from '../store/api-action';

function CommentsForm() {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const currentProperty = useSelector(getCurrentProperty);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = currentProperty!;
  const dispatch = useDispatch();
  const status = useSelector(getReviewPostStatus);

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkDisabled = (rating: string, review: string): boolean => !rating || (review.trim().length < 50 || review.trim().length > 300);

  const { rating, review } = formData;
  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(addReviewAction({ userReview: { rating: Number(rating), comment: review }, offerId: id }));
        if (status === Response.SUCCESS) {
          setFormData({
            rating: '',
            review: '',
          });
        }
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={status === Response.PENDING} onChange={fieldChangeHandle} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea disabled={status === Response.PENDING} minLength={50} maxLength={300} onChange={fieldChangeHandle} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      {status === Response.ERROR ? <p style={{ color: 'red' }}> Error, please try again </p> : null}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit" disabled={checkDisabled(rating, review) || status === Response.PENDING}>Submit</button>
      </div>
    </form>
  );
}


export default CommentsForm;
