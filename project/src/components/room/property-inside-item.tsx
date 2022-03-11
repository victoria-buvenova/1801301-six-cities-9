interface PropertyInsideItemProps {
  item: string;
}
export function PropertyInsideItem(props: PropertyInsideItemProps) {
  const { item } = props;
  return (
    <li className="property__inside-item">{item}</li>
  );
}
