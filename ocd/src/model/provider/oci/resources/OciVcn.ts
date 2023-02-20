/*
** Copyright (c) 2021, Andrew Hopkinson.
** Licensed under the GNU GENERAL PUBLIC LICENSE v 3.0 as shown at https://www.gnu.org/licenses/.
*/

import { OciResource } from "../OciResource"
import { models } from "oci-core"

export interface OciVcn extends OciResource, models.Vcn {}

export namespace OciVcn {
    export function newResource(): OciVcn {
        return {
            ...OciResource.newResource('vcn'),
            cidrBlock: '',
            cidrBlocks: [],
            lifecycleState: models.Vcn.LifecycleState.UnknownValue,
            timeCreated: new Date()
        }
    }
}

export class OciVcnClient {
    static new(): OciVcn {
        return {
            ...OciResource.newResource('vcn'),
            // region: '',
            // compartmentId: '',
            // id: OciResource.uuid('vcn'),
            // displayName: 'OCD Vcn',
            cidrBlock: '',
            cidrBlocks: [],
            lifecycleState: models.Vcn.LifecycleState.UnknownValue,
            timeCreated: new Date()
        }
    }

    static newOci() {}
}

export default OciVcnClient
