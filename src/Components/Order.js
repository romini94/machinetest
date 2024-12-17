import React, { useState } from "react";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";

const Order = () => {
  const [menus, setMenus] = useState([]); // Store all menus
  const [newMenu, setNewMenu] = useState({ name: "", description: "" }); // New menu form state

  // Add a new menu
  const addMenu = () => {
    if (newMenu.name && newMenu.description) {
      setMenus([...menus, { ...newMenu, items: [] }]);
      setNewMenu({ name: "", description: "" }); // Reset form
    } else {
      alert("Please fill in all menu fields.");
    }
  };

  // Add a new item to a specific menu
  const addMenuItem = (menuIndex, item) => {
    const updatedMenus = [...menus];
    updatedMenus[menuIndex].items.push(item);
    setMenus(updatedMenus);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Menu Manager</h1>

      {/* New Menu Form */}
      <Card className="mb-4 p-4">
        <h3>Create New Menu</h3>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu name"
                value={newMenu.name}
                onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Menu Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu description"
                value={newMenu.description}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button onClick={addMenu}>Add Menu</Button>
          </Col>
        </Row>
      </Card>

      {/* Display Menus */}
      {menus.map((menu, menuIndex) => (
        <Card key={menuIndex} className="mb-4 p-4">
          <h2>{menu.name}</h2>
          <p>{menu.description}</p>

          {/* Add Item Form */}
          <h4>Add Item</h4>
          <MenuItemForm
            onAddItem={(item) => addMenuItem(menuIndex, item)}
          />

          {/* Display Menu Items */}
          {menu.items.length > 0 ? (
            <div>
              <h4>Menu Items</h4>
              <ul>
                {menu.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <strong>{item.name}</strong> - {item.description} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No items in this menu.</p>
          )}
        </Card>
      ))}
    </Container>
  );
};

// Form Component for Adding Menu Items
const MenuItemForm = ({ onAddItem }) => {
  const [item, setItem] = useState({ name: "", description: "", price: "" });

  const addItem = () => {
    if (item.name && item.description && item.price) {
      onAddItem(item);
      setItem({ name: "", description: "", price: "" }); // Reset form
    } else {
      alert("Please fill in all item fields.");
    }
  };

  return (
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item description"
            value={item.description}
            onChange={(e) =>
              setItem({ ...item, description: e.target.value })
            }
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: e.target.value })}
          />
        </Form.Group>
      </Col>
      <Col className="d-flex align-items-end">
        <Button onClick={addItem}>Add Item</Button>
      </Col>
    </Row>
  );
};

export default Order;
