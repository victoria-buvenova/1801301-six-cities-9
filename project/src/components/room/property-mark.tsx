interface PropertyMarkProps{
  isPremium:boolean;
}
export function PropertyMark(props:PropertyMarkProps){
  const {isPremium} = props;
  if(!isPremium){
    return null;
  }
  return (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  );
}
