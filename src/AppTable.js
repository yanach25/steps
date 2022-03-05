import prepareDate from "./prepare-date";
import {Table} from "react-bootstrap";
import PropTypes from "prop-types";

function AppTable(props) {
    const arrayFromProps = Array.from(props.data).map(([date, path]) => {
        const dateArr = date.split('-');
        return {
            date,
            preparedDate: `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`,
            path,
            timestamp: prepareDate(date),
        }
    });

    if (arrayFromProps.length === 0) {
        return null;
    }

    const tableData = arrayFromProps
        .sort((prev, next) => Math.sign(next.timestamp - prev.timestamp))
        .map((item, index) => (
            <tr key={item.timestamp}>
                <td>{index + 1}</td>
                <td>{item.preparedDate}</td>
                <td>{item.path}</td>
                <td>
                    <svg onClick={() => props.onDelete(item.date)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </td>
            </tr>
        ))

    return <Table striped bordered hover>
        <thead>
        <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Пройденное расстояние</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {tableData}
        </tbody>
    </Table>;
}

AppTable.propTypes = {
    data: PropTypes.instanceOf(Map).isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default AppTable;
