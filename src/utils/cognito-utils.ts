import { environment } from "../environments/environment";
import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import {CognitoUserAttribute, CognitoUserPool, IAuthenticationDetailsData} from "amazon-cognito-identity-js";

export class CognitoUtils {
    public static getAuthDetails(email: string, password: string): IAuthenticationDetailsData {
        return {
            Username: email,
            Password: password,
        };
    }

    public static getUserPool() {
        return new CognitoUserPool(environment.cognitoSettings);
    }

    public static getAttribute(attrs: CognitoUserAttribute[], name: string): CognitoUserAttribute {
        return attrs.find(atr => atr.getName() === name);
    }

    public static getAttributeValue(attrs: AttributeListType, name: string, defValue: any): string {
        const attr = attrs.find(atr => atr.Name === name);
        return attr ? attr.Value : defValue;
    }

    public static getActiveAttribute(attrs: AttributeListType): boolean {
        return CognitoUtils.getAttributeValue(attrs, 'custom:active', '1') === '1';
    }

    public static createNewUserAttributes(request): CognitoUserAttribute[] {
        const emailAttribute = new CognitoUserAttribute({Name : 'email', Value : request.email });
        const emailVerifiedAttribute = new CognitoUserAttribute({Name : 'email_verified', Value : 'true' });
        const activeAttribute = new CognitoUserAttribute({Name : 'custom:active', Value : (request.active ? 1 : 0).toString() });
        return [
            emailAttribute, activeAttribute
        ];
    }

    public static createUpdatableUserAttributesData(request): AttributeListType {
        const preferedUsername = {Name : 'preferred_username', Value : request.username };
        const emailAttribute = {Name : 'email', Value : request.email };
        const emailVerifiedAttribute = {Name : 'email_verified', Value : 'true' };
        const activeAttribute = {Name : 'custom:active', Value : (request.active ? 1 : 0).toString() };
        return [
            preferedUsername, emailAttribute, emailVerifiedAttribute,
            activeAttribute
        ];
    }
}
