import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FAVORITES_INPUT_DATA, Response } from '../../constants';
import { getReviewPostStatus } from '../../selectors/get-review-post-status';
import { addReviewAction } from '../../store/api-action';
import { State } from '../../store/reducer';
import StarRating from './star-rating';

type CommentsFormProps = {
  currentId: string | undefined
}

const EMPTY_STATE = {
  rating: '',
  review: '',
};

function CommentsForm({ currentId }: CommentsFormProps) {
  const [formData, setFormData] = useState(EMPTY_STATE);
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: State) => state.postReviewMsg);
  const status = useSelector(getReviewPostStatus);
  useEffect(() => { setErrMsg(errorMessage || ''); }, [errorMessage]);


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
        dispatch(addReviewAction({ userReview: { rating: Number(rating), comment: review }, offerId: Number(currentId) }));
        if (status === Response.SUCCESS) {
          setFormData(EMPTY_STATE);
        }
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {FAVORITES_INPUT_DATA.map(({ id, title, value }) => (
          <StarRating
            value={value}
            id={id}
            title={title}
            fieldChangeHandle={fieldChangeHandle}
            status={status}
            key={id}
          />
        ))}
      </div>
      <textarea disabled={status === Response.PENDING} minLength={50} maxLength={300} onChange={fieldChangeHandle} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      {errMsg ? <p style={{ color: 'red' }}> {errMsg}</p> : null}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit" disabled={checkDisabled(rating, review) || status === Response.PENDING}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentsForm;
