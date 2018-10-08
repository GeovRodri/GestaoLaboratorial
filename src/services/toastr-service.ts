import {Injectable} from "@angular/core";
import * as toastr from 'toastr';

//  TOASTR
//  https://github.com/CodeSeven/toastr
@Injectable()
export class ToastrServiceProvider {

    constructor() {
        toastr.options = {
            "rtl": true,
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "6000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        }
    }

    /**
     *
     * @param {string} message - Message to be displayed
     * @param {string} title - Title to be displayed
     * @param options - An object containing the options wanted. Possible options:
     * {
     *     closeButton: true | false
     *     progressBar: true | false
     *     positionClass: toast-bottom-full-width | toast-top-full-width | toast-bottom-center | toast-top-center |
     *                    toast-top-right | toast-top-left | toast-bottom-right | toast-bottom-left
     *     timeOut: number (miliseconds)
     *     extendedTimeOut: number(miliseconds)
     *     preventDuplicates: true | false
     *     onClick: callback ( function() )
     *     onCloseClick: callback ( function() )
     *     onShow: callback ( function() )
     *     onHidden: callback ( function() )
     *
     *     More info: https://github.com/CodeSeven/toastr
     * }
     *
     */
    showSuccessToast(message: string, title?: string, options?: any): void {
        if(options) {
            toastr.success(message, title, options);
        } else {
            toastr.success(message, title);
        }
    }

    /**
     *
     * @param {string} message - Message to be displayed
     * @param {string} title - Title to be displayed
     * @param options - An object containing the options wanted. Possible options:
     * {
     *     closeButton: true | false
     *     progressBar: true | false
     *     positionClass: toast-bottom-full-width | toast-top-full-width | toast-bottom-center | toast-top-center |
     *                    toast-top-right | toast-top-left | toast-bottom-right | toast-bottom-left
     *     timeOut: number (miliseconds)
     *     extendedTimeOut: number(miliseconds)
     *     preventDuplicates: true | false
     *     onClick: callback ( function() )
     *     onCloseClick: callback ( function() )
     *     onShow: callback ( function() )
     *     onHidden: callback ( function() )
     *
     *     More info: https://github.com/CodeSeven/toastr
     * }
     *
     */
    showErrorToast(message: string, title?: string, options?: any): void {
        if(options) {
            toastr.error(message, title, options);
        } else {
            toastr.error(message, title);
        }
    }

    /**
     *
     * @param {string} message - Message to be displayed
     * @param {string} title - Title to be displayed
     * @param options - An object containing the options wanted. Possible options:
     * {
     *     closeButton: true | false
     *     progressBar: true | false
     *     positionClass: toast-bottom-full-width | toast-top-full-width | toast-bottom-center | toast-top-center |
     *                    toast-top-right | toast-top-left | toast-bottom-right | toast-bottom-left
     *     timeOut: number (miliseconds)
     *     extendedTimeOut: number(miliseconds)
     *     preventDuplicates: true | false
     *     onClick: callback ( function() )
     *     onCloseClick: callback ( function() )
     *     onShow: callback ( function() )
     *     onHidden: callback ( function() )
     *
     *     More info: https://github.com/CodeSeven/toastr
     * }
     *
     */
    showWarningToast(message: string, title?: string, options?: any): void {
        if(options) {
            toastr.warning(message, title, options);
        } else {
            toastr.warning(message, title);
        }
    }

    showInfoToast(message: string, title?: string, options?: any): void {
        if(options) {
            toastr.info(message, title, options);
        } else {
            toastr.info(message, title);
        }
    }
}
