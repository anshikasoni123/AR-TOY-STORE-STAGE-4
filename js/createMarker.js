AFRAME.registerComponent("create-marker",{
    init:async function(){
      var mainScene = document.querySelector("#main-scene");

      var toys =  await this.getAllToy();

      toys.map(toy => {
        var marker = document.createElement("marker");
        marker.setAttribute("id",toy.id);
        marker.setAttribute("type","pattern");
        marker.setAttribute("url",toy.marker_pattern_url);
        marker.setAttribute("cursor",{
            rayOrigin:"mouse"
        });
        marker.setAttribute("marker-handler",{});
        mainScene.appendChild(marker);

        if(toy.is_out_of_stock === "false"){
            var model = document.createElement("a-entity");
            model.setAttribute("id",`model-${toy.id}`);
            model.setAttribute("position",toy.model_geometry.position);
            model.setAttribute("rotation",toy.model_geometry.ratation);
            model.setAttribute("scale",toy.model_geometry.scale);
            model.setAttribute("gltf-model",`url(${toy.model_url})`);
            model.setAttribute("gesture-handler",{});
            model.setAttribute("animation-mixer",{});
            mainScene.appendChild(model);
    
            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id",`main-plane-${toy.id}`);
            mainPlane.setAttribute("position",{x: 0,y: 0,z: 0.1});
            mainPlane.setAttribute("rotation",{x: -90,y: 0,z: 0});
            mainPlane.setAttribute("width",2);
            mainPlane.setAttribute("height",2.5);
    
            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id",`main-plane-${toy.id}`);
            titlePlane.setAttribute("position",{x: 0,y: 1.33,z: 0.02});
            titlePlane.setAttribute("rotation",{x: 0,y: 0,z: 0});
            titlePlane.setAttribute("width",1.8);
            titlePlane.setAttribute("height",1);
            titlePlane.setAttribute("color","yellow");
            mainPlane.appendChild(titlePlane);
    
            var dishTitle = document.createElement("a-entity");
            dishTitle.setAttribute("position",{x:0,y:0,z:0.01});
            dishTitle.setAttribute("rotation",{x:0,y:0,z:0});
            dishTitle.setAttribute("text",{
                font:"monoid",
                value:"ROBOT",
                color:"black",
                width:1.8,
                height:1,
                align:"center"
            });    
            titlePlane.appendChild(dishTitle);  
            
            var ingredients = document.createElement("a-entity");
            ingredients.setAttribute("position",{x:0,y:0,z:0.01});
            ingredients.setAttribute("rotation",{x:0,y:0,z:0});
            ingredients.setAttribute("text",{
                font:"monoid",
                value:toy.description,
                color:"black",
                width:2,
                align:"center"
            });     
            mainPlane.appendChild(ingredients);
    
            var pricePlane = document.createElement("a-image");
            pricePlane.setAttribute("id", `price-plane-${toy.id}`);
            pricePlane.setAttribute(
              "src",
              "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
            );
            pricePlane.setAttribute("width", 0.8);
            pricePlane.setAttribute("height", 0.8);
            pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
            pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    
            //Price of the dish
            var price = document.createElement("a-entity");
            price.setAttribute("id", `price-${toy.id}`);
            price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
            price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            price.setAttribute("text", {
              font: "mozillavr",
              color: "white",
              width: 3,
              align: "center",
              value: `Only\n $${toy.price}`
            });
    
            pricePlane.appendChild(price);
            marker.appendChild(pricePlane);
        }

      })
    },
    getAllToy:async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data())
        })
    }
})