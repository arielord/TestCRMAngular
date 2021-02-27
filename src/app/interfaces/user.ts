import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

export interface User{
    userId: number;
    firstName: string;
    lastName: string;
    branchOfficeId: number;
    dateOfBirth: Date;
    phoneNumber: string;
    statusId: number;
    entitlementId: number;
    loginId: number;    
}