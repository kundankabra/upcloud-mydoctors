if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
  function getPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  }