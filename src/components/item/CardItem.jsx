import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../../css/CardItem.css';


function CardItem({ item }) {
  return (
    <div className='div-card'>
      <Link style={{ textDecoration: 'none' }} to={`/Producto/${item.id}`}>
        <Card className='card'>
          <Card.Img className='imagen' variant="top" src={item.image} />
          <Card.Body>
            <Card.Title className='card-title' >{item.title}</Card.Title>
            <Card.Text>
              {item.desription}
            </Card.Text>
            <Button className='boton-card' variant="primary">Ver Producto</Button>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default CardItem;