import { ReviewsListProps } from '../app/app-props';
import ReviewsItem from './reviews-item';

function ReviewsList(props: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {props.reviews.map((review) => (
        <ReviewsItem
          id={review.id}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
          user={review.user}
          key={review.id}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
