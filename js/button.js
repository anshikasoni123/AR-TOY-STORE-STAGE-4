AFRAME.registerComponent("create-buttons",{
    init:function(){
        //create button1
        var button1 = document.createElement("button");
        button1.innerHTML = "SUMMARY";
        button1.setAttribute("id","order-summary-button");
        button1.setAttribute("class","btn btn-warning");
        //create button2
        var button2 = document.createElement("button");
        button2.innerHTML = "ORDER NOW";
        button2.setAttribute("id","order-now-button");
        button2.setAttribute("class","btn btn-warning");
        //append button el
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button2);
    }
})