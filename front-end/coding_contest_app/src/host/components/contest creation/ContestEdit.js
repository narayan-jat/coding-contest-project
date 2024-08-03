import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './ContestEdit.css'; // Custom CSS for the sidebar

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <Navbar bg="light" expand="lg" className="flex-column">
        <Navbar.Brand>
          <Button
            className="sidebar-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="flex-column">
            <Nav.Link href="#home">
              <i className="bi bi-house-door"></i> Home
            </Nav.Link>
            <Nav.Link href="#services">
              <i className="bi bi-gear"></i> Services
            </Nav.Link>
            <Nav.Link href="#about">
              <i className="bi bi-info-circle"></i> About
            </Nav.Link>
            <Nav.Link href="#contact">
              <i className="bi bi-envelope"></i> Contact
            </Nav.Link>
            <Nav.Item>
              <Nav.Link href="#more">
                <i className="bi bi-list"></i> More
              </Nav.Link>
              <Nav className="flex-column">
                <Nav.Link href="#subitem1">
                  <i className="bi bi-chevron-right"></i> Subitem 1
                </Nav.Link>
                <Nav.Link href="#subitem2">
                  <i className="bi bi-chevron-right"></i> Subitem 2
                </Nav.Link>
              </Nav>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Sidebar;
