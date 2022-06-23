let contactList;

window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getContactFromStorage();
  }
  else {
    getContactFromServer();
  }

});

const processContactDataResponse = () => {
  document.querySelector(".contact-count").textContent = contactList.length;
  createInnerHtml();
  localStorage.removeItem('contactEdit');
};

const getContactFromStorage = () => {
  contactList = localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
  processContactDataResponse();
};

const getContactFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
        contactList = JSON.parse(responseText);
        processContactDataResponse();
      })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      contactList = [];
      processContactDataResponse();
    })
};

const createInnerHtml = () => {
  if (contactList.length == 0) {
    return;
  }
  const headerHtml = `<tr>
    <th>Name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th>Phone Number</th>
    </tr>`;

  let innerHtml = `${headerHtml}`;

  for (const contact of contactList) {
    innerHtml = `${innerHtml} 
        <tr>
        <td>${contact._name}</td>
        <td>${contact._address}</td>
        <td>${contact._city}</td>
        <td>${contact._state}</td>
        <td>${contact._zip}</td>
        <td>${contact._phoneNumber}</td>
        <td>
            <img src="C:\\Users\\user\\Desktop\\LFP_Batch\\Final_Workshop\\delete.svg" id="${contact.id}" onclick="remove(this)">
            <img src="C:\\Users\\user\\Desktop\\LFP_Batch\\Final_Workshop\\edit.svg" alt="update" id="${contact.id}" onclick="update(this)">
        </td>
        </tr>`;
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const remove = (node) => {
  let removeContact = contactList.find(contact => contact.id == node.id);
  if (!removeContact) {
    return;
  }
  const index = contactList
                .map(contact => contact.id)
                .indexOf(removeContact.id);
  contactList.splice(index, 1);
  localStorage.setItem("ContactList", JSON.stringify(contactList));
  document.querySelector(".contact-count").textContent = contactList.length;
  createInnerHtml();
  window.location.replace(site_properties.home_page);
};

const update = (node) => {
  let contactEdit = contactList.find(editContact => editContact.id == node.id);
  if (!contactEdit) {
    return;
  }
  localStorage.setItem('contactEdit', JSON.stringify(contactEdit));
  window.location.replace(site_properties.add_contacts_page);
};