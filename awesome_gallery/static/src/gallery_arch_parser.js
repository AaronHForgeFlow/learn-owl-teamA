/** @odoo-module */

import { XMLParser } from "@web/core/utils/xml";

export class GalleryArchParser extends XMLParser {
    parse(arch) {
        const xmlDoc = this.parseXML(arch);
        const imageField = xmlDoc.getAttribute("image_field");
        return {
            imageField,
        };
    }
}
