import { PropertyInsideItem } from './property-inside-item';

interface PropertyInsideProps {
  goods: string[]
}

export function PropertyInside(props: PropertyInsideProps) {
  const { goods } = props;
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {goods.map((item) => <PropertyInsideItem key={item} item={item} />)}
      </ul>
    </div>
  );
}
