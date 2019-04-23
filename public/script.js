let responseHandler = e => {
  //console.log("photo id", e.target.id);
  //console.log("album id", e.target.value);
  const photoId = e.target.id;
  const albumId = e.target.value;

  fetch("/album/addPhoto", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ photoId: photoId, albumId: albumId })
  }).then(res => {
    res.json().then(val => {
      console.log(val.message);
      //val.message == "success" ? alert("we did it!") : alert("err!");
    });
  });
};

let selectedAlbum = () => {
  let albumId = document.getElementById("albumId").value;
};

window.onload = () => {
//console.log("stuff happning");
  const selectTags = document.querySelectorAll("select");
  if (selectTags.length > 0) {
    selectTags.forEach(tag => {
      tag.addEventListener("change", responseHandler);
    });
  } else {
    console.log("err in script.js: window.onload");
  }
};

