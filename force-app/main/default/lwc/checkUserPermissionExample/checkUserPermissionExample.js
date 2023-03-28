import {LightningElement} from 'lwc';
import hasViewSetup from '@salesforce/userPermission/ViewSetup';

export default class CheckUserPermissionExample extends LightningElement {

    get isSetupEnabled() {
        return hasViewSetup;
    }
}