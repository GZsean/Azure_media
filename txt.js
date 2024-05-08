const { createRoot } = ReactDOM;

const {  Table  } = antd;
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    colSpan: 2,
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
 
  },
  {
    title: 'Home phone',
    colSpan: 4,
    dataIndex: 'tel',
    
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
 
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
 
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
 
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];
const App = () => <Table columns={columns} dataSource={data} bordered />;
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
