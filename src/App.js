import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import AppTable from "./AppTable";

function App() {
  const [path, setPath] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState(new Map());

  const onPathChange = (e) => {
    setPath(e.target.value);
  }

  const onDateChange = (e) => {
    setDate(e.target.value);
  }

  const clickHandler = (e) => {
    e.preventDefault();
    setData(prevData => {
      const map = new Map(prevData);
      let currData = map.get(date) ?? 0;
      map.set(date, +currData + Number(path));
      return map;
    });
    setDate('');
    setPath('');
  }

  const onDelete = (item) => {
    setData(prevData => {
      const map = new Map(prevData);
      map.delete(item);
      return map;
    });
  }

  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Дата, (ДД.ММ.ГГГГ)</Form.Label>
          <Form.Control value={date} onChange={(event) => onDateChange(event)} type="date" placeholder="Введите дату" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPath">
          <Form.Label>Пройдено, км</Form.Label>
          <Form.Control value={path} type="number" onChange={(event) => onPathChange(event)} placeholder="Введите пройденное расстояние" />
        </Form.Group>
        <Button disabled={!(path && date)} variant="primary" type="submit" onClick={(event) => clickHandler(event)}>
          Ok
        </Button>
      </Form>

      <AppTable data={data} onDelete = {(item) => onDelete(item)}/>
    </div>
  );
}

export default App;
