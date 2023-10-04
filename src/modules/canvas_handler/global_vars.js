class global {
    constructor() {
        this.width = 1200;
        this.height = 600;
        this.fps = 30;
        this.pipeSpace = 100;
        this.baseHeight = 100;
        this.mouseX = this.width / 2 ;
        this.mouseY = this.height / 2 ;     
        this.mouseXPress = this.width / 2 ;
        this.mouseYPress = this.height / 2 ;     
        this.stats = ["start", "running" , "gameover" , "play"];
        this.mousePressed = (e)=>{};
        this.mouseMove = (e)=>{};
        this.keyPressed = (e)=>{}
        this.init();
    }

    init(){
        let current = this;
        window.addEventListener("mousemove" , (e)=>{
            current.mouseX = e.clientX;
            current.mouseY = e.clientY;
            this.mouseMove(e);
        })        
        window.addEventListener("click" , (e)=>{
            current.mouseXPress = e.offsetX;
            current.mouseYPress = e.offsetY; 
            this.mousePressed(e);                       
        })        
        window.addEventListener("keypress" , (e)=>{
            this.keyPressed(e);
        })        
        
    }
    
}


export {global};


