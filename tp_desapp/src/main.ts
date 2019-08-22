interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
}
class ViewMainPage
{
    myf:MyFramework;

    constructor(myf:MyFramework)
    {
        this.myf = myf;    
    }

    showDevices(list:DeviceInt[]):void
    {
        // cargo la lista de objetos en el DOM
        let devicesUl:HTMLElement = this.myf.getElementById("devicesList");
       
        let items:string="";
        for(let i in list)
        {   
            let checkedStr="";
            if(list[i].state=="1")
                checkedStr="checked";

            switch(list[i].type)
            {
                case "0": // Lampara                     
                    items+="<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;  
                case "1": // Persiana                    
                    items+="<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;                                                    
            }
        }

        devicesUl.innerHTML=items;
    }

    getSwitchStateById(id:string):boolean {
        let el:HTMLInputElement = <HTMLInputElement>this.myf.getElementById(id);       
        return el.checked;
    }
}
class Main implements GETResponseListener, EventListenerObject, POSTResponseListener
{ 
    myf:MyFramework;
    view:ViewMainPage;

    handleEvent(evt:Event):void
    {   
       
        let element: HTMLElement = this.myf.getElementByEvent(evt);
       
        let id_element:string = element.id;
        let name_element:Array<string>= id_element.split('_') ; /*ARRAY {TIPO,ID}*/ 
       
        if ( name_element.indexOf("dev") == 0 ){
            console.log("Actualiza switch");
            let data:object = {"id":element.id,"state":this.view.getSwitchStateById(id_element)};
            this.myf.requestPOST("ws/device",data,this); 
        }
        else if(  name_element.indexOf("filter") == 0 ){
             console.log("Actualiza filtro");
             let data_id:string=name_element[1];  
             this.myf.requestGET("ws/devices?filter="+data_id,this); 
        }
    }

    handleGETResponse(status:number,response:string):void{
      if(status==200)
      {
          let data:DeviceInt[] = JSON.parse(response);
          this.view.showDevices(data);  
          let btn_opciones=["filter_0","filter_1","filter_2"];
          
          for(let i in btn_opciones)
          {
           let element:HTMLElement = this.myf.getElementById(btn_opciones[i]);
            element.addEventListener("click",this);               
          } 
          
          for(let i in data)
          {
              let sw:HTMLElement = this.myf.getElementById("dev_"+data[i].id);
              sw.addEventListener("click",this);                
          }  
      }
    }

    handlePOSTResponse(status:number,response:string):void{
        if(status==200)
        {
            console.log(response);
        }
    }

    main():void 
    { 
      this.myf = new MyFramework();

      this.view = new ViewMainPage(this.myf);

      this.myf.requestGET("ws/devices?filter=0",this);
    } 
} 
 
window.onload = () => {
    let obj = new Main(); 
    obj.main();
};
 

