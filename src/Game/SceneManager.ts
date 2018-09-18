/**
 * 场景管理类
 */
class SceneManager {
    private _stage:egret.DisplayObjectContainer // 设置所有场景所在的舞台(根)

    public mainScene:MainScene //主场景
    public aboutScene:AboutScene //关于场景

    constructor() {
        this.mainScene = new MainScene()
        this.aboutScene = new AboutScene()
    }

    /**
     * 获取实例
     */
    static sceneManager:SceneManager
    static get instance(){
        if(!this.sceneManager) {
            this.sceneManager =  new SceneManager()
        } 
        return this.sceneManager
    }
    /**
     * 设置根场景
     */
    public setStage(s:egret.DisplayObjectContainer) {
        this._stage = s
    }

    /**
     * 删除其他场景
     * @param scene 不需要删除的场景
     */
    private removeOther(scene) {
        let arr = [ this.aboutScene]
        arr.forEach((item)=> {
            if(scene === item) {
                return 
            }
            if(item.parent) {
                this.mainScene.removeChild(item)
            }
        })
    }

    /**
     * 主场景
     */
    static toMainScene() {
        let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        let mainScene = SceneManager.instance.mainScene // 主场景
    
        // 判断主场景是否有父级(如果有,说明已经被添加到了场景中)
        if(!mainScene.parent){
            // 未被添加到场景
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(mainScene)
        } 

        SceneManager.instance.removeOther(SceneManager.instance.mainScene)
    }

    /**
     * 关于场景
     */
    static toAboutSene() {
        this.instance.removeOther(this.instance.aboutScene)
        this.instance.mainScene.addChild(this.instance.aboutScene)
    }
}