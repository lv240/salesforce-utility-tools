import { LightningElement } from 'lwc';

export default class ParentPopup extends LightningElement {
    showPop=false;
    popUp(){
        this.showPop=true;
    }
}