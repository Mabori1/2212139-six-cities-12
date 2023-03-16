
import Card from '../card/card';
import {CardType} from '../../const';
import { useAppSelector } from '../../hooks';

type OfferListProps = {
  classNames: string;
  cardType: CardType;
}

export default function OfferList({cardType, classNames}: OfferListProps): JSX.Element {

  const offers = useAppSelector((state) => state.offersByLocation);

  return (
    <div className={classNames}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
        />
      ))}
    </div>
  );
}
