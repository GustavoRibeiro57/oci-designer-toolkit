/*
** Copyright (c) 2021, Andrew Hopkinson.
** Licensed under the GNU GENERAL PUBLIC LICENSE v 3.0 as shown at https://www.gnu.org/licenses/.
*/

import { OciResource } from "../OciResource"
import { models } from "oci-core"

export interface OciSubnet extends OciResource, models.Subnet {}

export namespace OciSubnet {
    export function newResource(): OciSubnet {
        return {
            ...OciResource.newResource('subnet'),
            vcnId: '',
            cidrBlock: '',
            routeTableId: '',
            securityListIds: [],
            virtualRouterIp: '',
            virtualRouterMac: '',
            lifecycleState: models.Subnet.LifecycleState.UnknownValue,
            timeCreated: new Date()
        }
    }
}

export class OciSubnetClient {
    static new(): OciSubnet {
        return {
            ...OciResource.newResource('subnet'),
            // region: '',
            // compartmentId: '',
            // id: OciResource.uuid('vcn'),
            // displayName: 'OCD Subnet',
            vcnId: '',
            cidrBlock: '',
            routeTableId: '',
            securityListIds: [],
            virtualRouterIp: '',
            virtualRouterMac: '',
            lifecycleState: models.Subnet.LifecycleState.UnknownValue,
            timeCreated: new Date()
        }
    }

    static newOci() {}
}

export default OciSubnetClient
