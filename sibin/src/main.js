import React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator} from 'primereact/api';
import { useState,useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';



export default function Assignment(){

  const products = [{
    id: '1',
    channel: 'f230fh0g3',
    orderno: '#TKN20203754',
    orderdate: '2022-05-04',
    city: 'Lucknow',
    customername: 'Abhishek Dixit',
    ordervalue: "0.00",
    status: 'pending',
    operation: 'INSTOCK',
  },
  {
    id: '2',
    channel: 'f230fh0g3',
    orderno: '#TKN20203753',
    orderdate: '2022-05-04',
    city: 'Lucknow',
    customername: 'Abhishek Dixit',
    ordervalue: "0.00",
    status: 'pending',
    operation: 'INSTOCK',
  },
  {
    id: '3',
    channel: '#TKN20203752',
    orderno: 'Bamboo Watch',
    orderdate: '2022-05-04',
    city: 'Lucknow',
    customername: 'Abhishek Dixit',
    ordervalue: "0.00",
    status: 'pending',
    operation: 'INSTOCK',
  }
  ]

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const [selectedProducts, setSelectedProducts] = useState(null);
const [rowClick, setRowClick] = useState(true);

const [posts, setPosts] = useState([]);
useEffect(() => {
   fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setPosts(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
}, []);

const imageBodyTemplate = (product) => {
  return <img src={`https://cabinetm-beta.s3.amazonaws.com/00000177-9bee-2aa7-32bb-3a7b8f9f46bb.jpg`} height="90px" width="90px" className="w-6rem shadow-2 border-round" />;
};

const dropdownTemplate = (product) => {
  return(
  <Dropdown>
  <Dropdown.Toggle variant="outlined" id="dropdown-basic">
    Actions
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Actions</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  );
};

const statusBodyTemplate = (product) => {
  const severity = getSeverity(product);
  const className = severity 

  return (
    <button className={className}>
      {product.status}
    </button>
  );
};

const getSeverity = (product) => {
  switch (product.status) {
      case 'pending':
          return 'btn-sm btn btn-outline-success';
      default:
          return null;
  }
};


const linkBodyTemplate = (product) => {
  // Assuming products.id contains the link URL
  const linkUrl = product.orderno; 

  return (
    <a href={linkUrl}>
      {product.orderno}
    </a>
  );
}



  
 return(
    <>
     <header>
        <div className="logo-div">
            <img src={process.env.PUBLIC_URL+"images.jpeg"}alt='' className='logo-image'/>
            {/* <AiOutlineMenuFold /> */}
            {/* <FaBeer /> */}
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
        </div>
     </header>
     <main>
     <div className="container-fluid">
            <Row>
                <Col md={2}>
                <ul className='side-bar'>
                    <li href="#link" className='side-bars'>Dashboard</li><br></br>
                    <li href="#link" className='side-bars'>Inventory</li><br></br>
                    <li href="#link" className='side-bars'>Orders</li><br></br>
                    <li href="#link" className='side-bars'>Shipping</li><br></br>
                    <li href="#link" className='side-bars'>Channel</li><br></br>
                </ul>
                   
                </Col>
                <Col md={10} className='column-right'>
                    <Row>
                        <div className='Orders-div' >
                      <button className="Orders">Orders</button>
                      {/* <FontAwesomeIcon icon="fa-regular fa-gear" /> */}
                      <br></br>
                      
                    
                  
{/* Navbar */}
                <Navbar expand="lg" className="nav">
                   <Container>
                     
                       <Nav className="me-auto">
                           <Nav.Link href="#link" className='nav-sub'>Pending</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>Accepted</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>AWB Created</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>Ready to Ship</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>Shipped</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>Completed</Nav.Link>
                           <Nav.Link href="#link" className='nav-sub'>Cancelled</Nav.Link>

                           
                           
                        </Nav>
                     </Container>
                </Navbar><br></br>
                <div className='table-div'>
                <Row>
                    <Col>
                    <Button variant="outline-secondary" className="btn-sm" id='button'>import</Button>{' '}
                    <Button variant="outline-secondary" className="btn-sm" id='button'>Accept</Button>{' '}
                    <Button variant="outline-secondary" className="btn-sm" id='button'>Print</Button>{' '}
                    <Button variant="outline-secondary" className="btn-sm" id='refresh-button'>Refresh</Button>{' '}
                    </Col>
                </Row>
                <br></br>
                <Row>
                <div className="card">
            <DataTable value={products} size="small" selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id"
             tableStyle={{ minWidth: '10 rem' }} paginator rows={3} rowsPerPageOptions={[5, 10, 15, 20]}
            globalFilterFields={['name', 'country.name', 'representative.name', 'status']}  emptyMessage="No customers found.">
                <Column field="id" selectionMode="multiple" header=""  style={{ width: '20px' }}></Column>
                <Column field="channel"  header="Channel" body={imageBodyTemplate} sortable style={{ width: '30px' }}></Column>
                {/* <Column field="orderno" header="Order No" filter filterPlaceholder="Search by name" sortable style={{ width: '50px' }} ></Column> */}
                <Column field="id"  header="Order No" body={linkBodyTemplate} style={{ width: '20px' }}></Column>
                <Column field="orderdate" header="Order Date" filter filterPlaceholder="Search by name" sortable style={{ width: '50px' }}></Column>
                <Column field="city" header="City" filter filterPlaceholder="Search by name" sortable style={{ width: '10px' }}></Column>
                <Column field="customername" header="Customer Name" sortable style={{ width: '180px' }}></Column>
                <Column field="ordervalue" header="Order Value" filter filterPlaceholder="Search by name" sortable style={{ width: '10px' }}></Column>
                <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ width: '60px' }}></Column>
                 
                <Column field="operation" filterField="products" body={dropdownTemplate} filter filterElement={products} showFilterMenu={false}  header="Operation" sortable style={{ width: '60px' }}></Column>
            </DataTable>
            {/* filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
        body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} */}
        </div>
                                </Row>




                </div>
                </div>
                
                </Row>
                
               
                   

                </Col>

            </Row>
        </div>
     </main>
    </>
 );
}
