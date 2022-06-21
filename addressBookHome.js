window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
  });
  
  const createInnerHtml = () => {
    if (contactList.length == 0) {
      return;
    }
    const headerHtml = `<tr>
      <th>Full Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
      <th>Phone Number</th>
      </tr>`;
    let innerHtml = `${headerHtml}`;
    for (let contact of contactList) {
      innerHtml = `${innerHtml} 
          <tr>
          <td>${contact._name}</td>
          <td>${contact._address}</td>
          <td>${contact._city}</td>
          <td>${contact._state}</td>
          <td>${contact._zip}</td>
          <td>${contact._phoneNumber}</td>
          <td>
              <img src="C:\\Users\\user\\Desktop\\LFP_Batch\\Final_Workshop\\delete.svg" alt="delete" id="${contact._id}" onclick="remove(this)">
              <img src="C:\\Users\\user\\Desktop\\LFP_Batch\\Final_Workshop\\edit.svg" alt="update" id="${contact._id}" onclick="update(this)">
          </td>
          </tr>`;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
  };
  
  let contactList = [
    {
      _id: 1,
      _name: "Venktesh",
      _phoneNumber: "91 9527872718",
      _address: "Baner",
      _city: "Pune",
      _state: "Maharashtra",
      _zip: "123456",
    },
    {
      _id: 2,
      _name: "Balu",
      _phoneNumber: "91 9527872718",
      _address: "AnandNagar",
      _city: "Chennai",
      _state: "Tamil Nadu",
      _zip: "134567",
    },
  ];