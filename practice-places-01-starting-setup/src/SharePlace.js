import { Modal }  from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFindder {

  constructor(){
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    addressForm.addEventListener('click', this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById('share-link');
  
    if(! navigator.clipboard) {   
      sharedLinkInputElement.select();  
      return;
    }
    navigator.clipboard.writeText(sharedLinkInputElement.value)
          .then(() => {
            alert('Copied into ClipBoard!');
          })
          .catch(err => {
            console.log(err);
            sharedLinkInputElement.select(); 
          });
  }

  selectPlace(cordinates, address) {
    if(this.map) {
      this.map.render();
    } else {
      this.map =  new Map(cordinates);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInputElement = document.getElementById('share-link');
    sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${cordinates.lng}`;
  }

  locateUserHandler() {
    if(!navigator.geolocation) {
      alert(
        'Location Future is not available in your browser - please use a more modern browser'
        );
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading Location - Please wait!'
       );
    modal.show();
    navigator.geolocation.getCurrentPosition(
    async  successResult => {

      const coordinates = {
        lat: successResult.coords.latitude + Math.random() * 50,
        lng: successResult.coords.longitude + Math.random() * 50,
      };
      const address = await getAddressFromCoords(coordinates);
      modal.hide();
      this.selectPlace(coordinates, address);
    }, error => {
      modal.hide();
      alert('Could not locate you unfortunately. Please enter an address manually!');
    });
  }

 async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0 ) {
      alert('Invalid address entered - please try again!');
      return;
    }
    const modal = new Moadal( 
      'loading-modal-content',
      'Loading Location - Please wait!'
    );
    modal.show();
    try {
      const coordinates =  await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
 
  }
}

const placeFinder = new PlaceFindder();