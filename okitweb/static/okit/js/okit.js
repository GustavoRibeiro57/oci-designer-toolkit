console.info('Loaded OKIT Javascript');
/*
** Add Clone to JSON package
 */
if (typeof JSON.clone !== "function") {
    JSON.clone = function(obj) {
        return JSON.parse(JSON.stringify(obj));
    };
}

/*
** Define OKIT Artifact Classes
 */
class OkitSvg {
    constructor(x=0, y=0, height=0, width=0) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

class OkitArtifact {
    /*
    ** Create
     */
    constructor (okitjson) {
        this.getOkitJson = function() {return okitjson};
    }


    /*
    ** Clone Functionality
     */
    clone() {
        alert('Clone function "clone()" has not been implemented.')
        return;
    }


    /*
    ** Get the Artifact name this Artifact will be know by.
     */
    getArtifactReference() {
        alert('Get Artifact Reference function "getArtifactReference()" has not been implemented.')
        return;
    }

    artifactToElement(name) {
        return name.toLowerCase().split(' ').join('_') + 's';
    }


    /*
    ** Delete Processing
     */
    delete() {
        console.groupCollapsed('Delete (Default) ' + this.getArtifactReference() + ' : ' + id);
        // Delete Child Artifacts
        this.deleteChildren();
        // Remove SVG Element
        d3.select("#" + this.id + "-svg").remove()
        console.groupEnd();
    }

    deleteChildren() {
        console.info('Default empty deleteChildren()');
    }

    getChildren(artifact) {
        let children = [];
        let key = this.getParentKey();
        for (let child of this.getOkitJson()[this.artifactToElement(artifact)]) {
            if (child[key] === this.id) {
                children.push(child);
            }
        }
        return children;
    }


    /*
     ** SVG Processing
     */
    draw() {
        console.groupCollapsed('Drawing (Default) ' + this.getArtifactReference() + ' : ' + this.id + ' [' + this.parent_id + ']');
        let svg = drawArtifact(this.getSvgDefinition());
        /*
        ** Add Properties Load Event to created svg. We require the definition of the local variable "me" so that it can
        ** be used in the function dur to the fact that using "this" in the function will refer to the function not the
        ** Artifact.
         */
        let me = this;
        svg.on("click", function() {
            me.loadProperties();
            d3.event.stopPropagation();
        });
        console.groupEnd();
    }

    // Return Artifact Specific Definition.
    getSvgDefinition() {
        alert('Get Svg Definition function "getSvgDefinition()" has not been implemented.')
        return;
    }

    // Return Artifact Dimentions
    getDimensions() {
        alert('Get Dimension function "getDimensions()" has not been implemented.')
        return;
    }

    getMinimumDimensions() {
        return {width: icon_width, height:icon_height};
    }

    newSVGDefinition(artifact, data_type) {
        let definition = {};
        definition['artifact'] = artifact;
        definition['data_type'] = data_type;
        definition['name'] = {show: false, text: artifact['display_name']};
        definition['label'] = {show: false, text: data_type};
        definition['info'] = {show: false, text: data_type};
        definition['svg'] = {x: 0, y: 0, width: icon_width, height: icon_height};
        definition['rect'] = {x: 0, y: 0,
            width: icon_width, height: icon_height,
            width_adjust: 0, height_adjust: 0,
            stroke: {colour: '#F80000', dash: 5},
            fill: 'white', style: 'fill-opacity: .25;'};
        definition['icon'] = {show: true, x_translation: 0, y_translation: 0};
        definition['title_keys'] = [];

        return definition
    }


    /*
    ** Property Sheet Load function
     */
    loadProperties() {
        alert('Load Properties function "loadProperties()" has not been implemented.')
        return;
    }


    /*
    ** Child Offset Functions
     */
    getParentKey() {
        alert('Function "getParentKey()" has not been implemented for ' + this.getArtifactReference() + '.');
    }

    getChildOffset(child_type) {
        console.groupCollapsed('Getting Offset for ' + child_type);
        let offset = {dx: 0, dy: 0};
        if (this.getTopEdgeArtifacts().includes(child_type)) {
            console.info('Top Edge Artifact');
            offset = this.getTopEdgeChildOffset();
        } else if (this.getTopArtifacts().includes(child_type)) {
            console.info('Top Artifact');
            offset = this.getTopChildOffset();
        } else if (this.getContainerArtifacts().includes(child_type)) {
            console.info('Container Artifact');
            offset = this.getContainerChildOffset();
        } else if (this.getBottomArtifacts().includes(child_type)) {
            console.info('Bottom Artifact');
            offset = this.getBottomChildOffset();
        } else if (this.getBottomEdgeArtifacts().includes(child_type)) {
            console.info('Bottom Edge Artifact');
            offset = this.getBottomEdgeChildOffset();
        } else if (this.getLeftEdgeArtifacts().includes(child_type)) {
            console.info('Left Edge Artifact');
            offset = this.getLeftEdgeChildOffset();
        } else if (this.getLeftArtifacts().includes(child_type)) {
            console.info('Left Artifact');
            offset = this.getLeftChildOffset();
        } else if (this.getRightArtifacts().includes(child_type)) {
            console.info('Right Artifact');
            offset = this.getRightChildOffset();
        } else if (this.getRightEdgeArtifacts().includes(child_type)) {
            console.info('Right Edge Artifact');
            offset = this.getRightEdgeChildOffset();
        } else {
            console.warn(child_type + ' Not Found for ' + this.display_name);
        }
        console.groupEnd();
        return offset
    }

    getFirstChildOffset() {
        alert('Get First Child function "getFirstChildOffset()" has not been implemented.');
    }

    // Top Edge
    hasTopEdgeChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getTopEdgeArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getTopEdgeChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getTopEdgeArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height = Math.max(max_dimensions.height, dimension.height);
                    max_dimensions.width += Math.round(dimension.width + positional_adjustments.spacing.x);
                }
            }
        }
        return max_dimensions;
    }

    getFirstTopEdgeChildOffset() {
        let offset = {
            dx: Math.round(positional_adjustments.padding.x * 2 + positional_adjustments.spacing.x * 2),
            dy: 0
        };
        return offset;
    }

    getTopEdgeChildOffset() {
        alert('Get First Top Edge Child function "getTopEdgeChildOffset()" has not been implemented.');
    }

    // Top
    hasTopChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getTopArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getTopChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getTopArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height = Math.max(max_dimensions.height, dimension.height);
                    max_dimensions.width += Math.round(dimension.width + positional_adjustments.spacing.x);
                }
            }
        }
        return max_dimensions;
    }

    getFirstTopChildOffset() {
        let offset = this.getFirstLeftChildOffset();
        if (this.hasLeftChildren()) {
            offset.dx += Math.round(positional_adjustments.padding.x + positional_adjustments.spacing.x);
        }
        return offset;
    }

    getTopChildOffset() {
        alert('Get Top Child function "getTopEdgeChildOffset()" has not been implemented.');
    }

    // Container
    hasContainerChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getContainerArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getContainerChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getContainerArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height += Math.round(dimension.height + positional_adjustments.spacing.y);
                    max_dimensions.width = Math.max(max_dimensions.width, dimension.width);
                }
            }
        }
        return max_dimensions;
    }

    getFirstContainerChildOffset() {
        let offset = this.getFirstTopChildOffset();
        if (this.hasTopChildren()) {
            let dimensions = this.getTopChildrenMaxDimensions();
            offset.dy += Math.round(dimensions.height + positional_adjustments.spacing.y);
        }
        return offset;
    }

    getContainerChildOffset() {
        alert('Get Container Child function "getContainerChildOffset()" has not been implemented.');
    }

    // Bottom
    hasBottomChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getBottomArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getBottomChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getBottomArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height = Math.max(max_dimensions.height, dimension.height);
                    max_dimensions.width += Math.round(dimension.width + positional_adjustments.spacing.x);
                }
            }
        }
        return max_dimensions;
    }

    getFirstBottomChildOffset() {
        let offset = this.getFirstTopChildOffset();
        if (this.hasTopChildren()) {
            let dimensions = this.getTopChildrenMaxDimensions();
            offset.dy += Math.round(dimensions.height + positional_adjustments.spacing.y * 4);
        }
        if (this.hasContainerChildren()) {
            let dimensions = this.getContainerChildrenMaxDimensions();
            offset.dy += Math.round(dimensions.height + positional_adjustments.spacing.y);
        }
        return offset;
    }

    getBottomChildOffset() {
        alert('Get Bottom Child function "getBottomEdgeChildOffset()" has not been implemented.');
    }

    // Bottom Edge
    hasBottomEdgeChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getBottomEdgeArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getBottomEdgeChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getBottomEdgeArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height = Math.max(max_dimensions.height, dimension.height);
                    max_dimensions.width += Math.round(dimension.width + positional_adjustments.spacing.x);
                }
            }
        }
        return max_dimensions;
    }

    getFirstBottomEdgeChildOffset() {
        let offset = {
            dx: Math.round(positional_adjustments.spacing.x),
            dy: 0
        };
        return offset;
    }

    getBottomEdgeChildOffset() {
        alert('Get Bottom Edge Child function "getBottomEdgeChildOffset()" has not been implemented.');
    }

    // Left Edge
    getLeftEdgeChildOffset() {
        alert('Get Left Edge Child function "getLeftEdgeChildOffset()" has not been implemented.');
    }

    // Left
    hasLeftChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getLeftArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getLeftChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getLeftArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height += Math.round(dimension.height + positional_adjustments.spacing.y);
                    max_dimensions.width = Math.max(max_dimensions.width, dimension.width);
                }
            }
        }
        return max_dimensions;
    }

    getFirstLeftChildOffset() {
        let offset = {
            dx: Math.round(positional_adjustments.spacing.x * 4),
            dy: Math.round(positional_adjustments.padding.y + positional_adjustments.spacing.y * 2)
        };
        return offset;
    }

    getLeftChildOffset() {
        alert('Get Left Child function "getLeftEdgeChildOffset()" has not been implemented.');
    }

    // Right
    hasRightChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getRightArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getRightChildrenMaxDimensions() {
        let max_dimensions = {height: 0, width: 0};
        let key = this.getParentKey();
        for (let group of this.getRightArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    let dimension = artifact.getDimensions();
                    max_dimensions.height += Math.round(dimension.height + positional_adjustments.spacing.y);
                    max_dimensions.width = Math.max(max_dimensions.width, dimension.width);
                }
            }
        }
        return max_dimensions;
    }

    getFirstRightChildOffset() {
        let offset = this.getFirstLeftChildOffset();
        if (this.hasLeftChildren()) {
            offset.dx += Math.round(positional_adjustments.padding.x + positional_adjustments.spacing.x);
        }
        if (this.hasContainerChildren()) {
            let dimensions = this.getContainerChildrenMaxDimensions();
            offset.dx += dimensions.width;
            offset.dx += positional_adjustments.spacing.x;
            offset.dx += positional_adjustments.padding.x;
        }
        return offset;
    }

    getRightChildOffset() {
        alert('Get Right Child function "getRightEdgeChildOffset()" has not been implemented.');
    }

    // Right Edge
    hasRightEdgeChildren() {
        let children = false;
        let key = this.getParentKey();
        for (let group of this.getRightEdgeArtifacts()) {
            for(let artifact of this.getOkitJson()[this.artifactToElement(group)]) {
                if (artifact[key] === this.id) {
                    children = true;
                    break;
                }
            }
        }
        return children;
    }

    getFirstRightEdgeChildOffset() {
        let offset = {
            dx: Math.round(this.getDimensions().width - icon_width),
            dy: Math.round(positional_adjustments.padding.x)
        };
        return offset;
    }

    getRightEdgeChildOffset() {
        alert('Get Right Edge Child function "getRightEdgeChildOffset()" has not been implemented.');
    }


    /*
    ** Child Type Functions
     */
    getTopEdgeArtifacts() {
        return [];
    }

    getTopArtifacts() {
        return [];
    }

    getContainerArtifacts() {
        return [];
    }

    getBottomArtifacts() {
        return [];
    }

    getBottomEdgeArtifacts() {
        return [];
    }

    getLeftEdgeArtifacts() {
        return [];
    }

    getLeftArtifacts() {
        return [];
    }

    getRightArtifacts() {
        return [];
    }

    getRightEdgeArtifacts() {
        return [];
    }


    /*
    ** Define Allowable SVG Drop Targets
     */
    getTargets() {
        // Return list of Artifact names
        return [];
    }
}

class OkitContainerArtifact extends OkitArtifact {
    /*
    ** Create
     */
    constructor(okitjson = {}) {
        super(okitjson);
    }

    /*
    ** SVG Functions
     */
    getDimensions(id_key='') {
        console.groupCollapsed('Getting Dimensions of ' + this.getArtifactReference() + ' : ' + this.id);
        let padding = this.getPadding();
        let dimensions = {width: 0, height: 0};
        let offset = {dx: 0, dy: 0};
        // Process Top Edge Artifacts
        offset = this.getFirstTopEdgeChildOffset();
        let top_edge_dimensions = this.getTopEdgeChildrenMaxDimensions();
        dimensions.width  = Math.max(dimensions.width, top_edge_dimensions.width + offset.dx - padding.dx);
        dimensions.height = Math.max(dimensions.height, top_edge_dimensions.height);
        // Process Bottom Edge Artifacts
        offset = this.getFirstBottomEdgeChildOffset();
        let bottom_edge_dimensions = this.getBottomEdgeChildrenMaxDimensions();
        dimensions.width  = Math.max(dimensions.width, bottom_edge_dimensions.width);
        dimensions.height = Math.max(dimensions.height, bottom_edge_dimensions.height);
        // Process Top Artifacts
        offset = this.getFirstTopChildOffset();
        let top_dimensions = this.getTopChildrenMaxDimensions();
        dimensions.width   = Math.max(dimensions.width, top_dimensions.width);
        dimensions.height += top_dimensions.height;
        // Process Container Artifacts
        offset = this.getFirstContainerChildOffset();
        let container_dimensions = this.getContainerChildrenMaxDimensions();
        dimensions.width   = Math.max(dimensions.width, container_dimensions.width);
        dimensions.height += container_dimensions.height;
        // Process Bottom Artifacts
        offset = this.getFirstBottomChildOffset();
        let bottom_dimensions = this.getBottomChildrenMaxDimensions();
        dimensions.width   = Math.max(dimensions.width, bottom_dimensions.width);
        dimensions.height += bottom_dimensions.height;
        // Process Left Edge Artifacts
        // Process Right Edge Artifacts
        // Process Left Artifacts
        let left_dimensions = this.getLeftChildrenMaxDimensions();
        dimensions.width += left_dimensions.width;
        dimensions.height = Math.max(dimensions.height, left_dimensions.height);
        // Process Right Artifacts
        let right_dimensions = this.getRightChildrenMaxDimensions();
        dimensions.width += right_dimensions.width;
        dimensions.height = Math.max(dimensions.height, right_dimensions.height);
        if (this.hasRightChildren()) {
            dimensions.width += positional_adjustments.spacing.x;
            dimensions.width += positional_adjustments.padding.x;
        }
        // Add Padding
        dimensions.width += padding.dx * 2;
        dimensions.height += padding.dy * 2;
        // Check size against minimum
        dimensions['width']  = Math.max(dimensions['width'],  this.getMinimumDimensions().width);
        dimensions['height'] = Math.max(dimensions['height'], this.getMinimumDimensions().height);
        console.info('Overall Dimensions       : ' + JSON.stringify(dimensions));
        console.groupEnd();
        return dimensions;
    }

    getPadding() {
        let padding = {
            dx: Math.round(positional_adjustments.spacing.x * 4),
            dy: Math.round(positional_adjustments.padding.y + positional_adjustments.spacing.y * 2)
        };
        return padding;
    }


    getChildTypes() {
        let child_types = this.getContainerArtifacts().concat(
            this.getLeftEdgeArtifacts(),   this.getLeftArtifacts(),
            this.getRightEdgeArtifacts(),  this.getRightArtifacts(),
            this.getTopEdgeArtifacts(),    this.getTopArtifacts(),
            this.getBottomEdgeArtifacts(), this.getBottomArtifacts()
            );
        console.info('Child Types : ' + child_types);
        return child_types;
    }

    getChildElements() {
        let child_elements = [];
        this.getChildTypes().forEach(element => child_elements.push(this.artifactToElement(element)));
        return child_elements;
    }

    /*
    ** Child Offset Functions
     */
    getTopEdgeChildOffset() {
        let offset = this.getFirstTopEdgeChildOffset();
        // Count how many top edge children and adjust.
        let count = 0;
        for (let child of this.getTopEdgeArtifacts()) {
            count += $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").length;
        }
        console.info('Top Edge Count : ' + count);
        // Increment x position based on count
        offset.dx += Math.round((icon_width * count) + (positional_adjustments.spacing.x * count));
        return offset;
    }

    getTopChildOffset() {
        let offset = this.getFirstTopChildOffset();
        for (let child of this.getTopArtifacts()) {
            $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").each(
                function() {
                    offset.dx += Math.round(Number($(this).attr('width')) + positional_adjustments.spacing.x);
                });
        }
        return offset;
    }

    getContainerChildOffset() {
        let offset = this.getFirstContainerChildOffset();
        // Count how many top edge children and adjust.
        for (let child of this.getContainerArtifacts()) {
            //count += $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").length;
            $('#' + this.id + '-svg').children('svg[data-type="' + child + '"]').each(
                function() {
                    offset.dy += Math.round(Number($(this).attr('height')) + positional_adjustments.spacing.y);
                });
        }
        console.info('Offset : ' + JSON.stringify(offset));
        return offset;
    }

    getBottomChildOffset() {
        let offset = this.getFirstBottomChildOffset();
        for (let child of this.getBottomArtifacts()) {
            $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").each(
                function() {
                    offset.dx += Math.round(Number($(this).attr('width')) + positional_adjustments.spacing.x);
                });
        }
        return offset;
    }

    getBottomEdgeChildOffset() {}

    getLeftEdgeChildOffset() {}

    getLeftChildOffset() {
        let offset = this.getFirstLeftChildOffset();
        for (let child of this.getLeftArtifacts()) {
            $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").each(
                function() {
                    offset.dy += Math.round(icon_height + positional_adjustments.spacing.y);
                });
        }
        return offset;
    }

    getRightChildOffset() {
        let offset = this.getFirstRightChildOffset();
        for (let child of this.getRightArtifacts()) {
            $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").each(
                function() {
                    offset.dy += Math.round(icon_height + positional_adjustments.spacing.y);
                });
        }
        return offset;
    }

    getRightEdgeChildOffset() {
        let offset = this.getFirstRightEdgeChildOffset();
        for (let child of this.getRightEdgeArtifacts()) {
            $('#' + this.id + '-svg').children("svg[data-type='" + child + "']").each(
                function() {
                    offset.dy += Math.round(icon_height + positional_adjustments.spacing.y);
                });
        }
        return offset;
    }
}

class OkitJson {
    /*
    ** Create
     */
    constructor(okit_json_string = '') {
        this.title = "OKIT OCI Visualiser Json";
        this.description = "OKIT Generic OCI Json which can be used to generate ansible, terraform, .......";
        this.compartments = [];
        this.autonomous_databases = [];
        this.block_storage_volumes = [];
        this.containers = [];
        this.dynamic_routing_gateways = [];
        this.fast_connects = [];
        this.file_storage_systems = [];
        this.instances = [];
        this.internet_gateways = [];
        this.load_balancers = [];
        this.local_peering_connections = [];
        this.nat_gateways = [];
        this.object_storage_buckets = [];
        this.remote_peering_connections = [];
        this.route_tables = [];
        this.security_lists = [];
        this.service_gateways = [];
        this.subnets = [];
        this.virtual_cloud_networks = [];
        this.web_application_firewalls = [];

        if (okit_json_string !== undefined && okit_json_string.length > 0) {
            this.load(JSON.parse(okit_json_string));
        }
    }

    /*
    ** Load Simple Json Structure and build Object Based JSON
     */
    load(okit_json) {
        console.groupCollapsed('Load OKT Json');
        // Compartments
        if (okit_json.hasOwnProperty('compartments')) {
            for (let artifact of okit_json['compartments']) {
                let obj = this.newCompartment(artifact);
                console.info(obj);
            }
        }

        // Compartment Subcomponents
        // Autonomous Databases
        if (okit_json.hasOwnProperty('autonomous_databases')) {
            for (let artifact of okit_json['autonomous_databases']) {
                let obj = this.newAutonomousDatabase(artifact);
                console.info(obj);
            }
        }
        // Block Storage Volumes
        if (okit_json.hasOwnProperty('block_storage_volumes')) {
            for (let artifact of okit_json['block_storage_volumes']) {
                let obj = this.newBlockStorageVolume(artifact);
                console.info(obj);
            }
        }
        // Object Storage Buckets
        if (okit_json.hasOwnProperty('object_storage_buckets')) {
            for (let artifact of okit_json['object_storage_buckets']) {
                let obj = this.newObjectStorageBucket(artifact);
                console.info(obj);
            }
        }
        // Virtual Cloud Networks
        if (okit_json.hasOwnProperty('virtual_cloud_networks')) {
            for (let artifact of okit_json['virtual_cloud_networks']) {
                let obj = this.newVirtualCloudNetwork(artifact);
                console.info(obj);
            }
        }
        // Web Application Firewall
        if (okit_json.hasOwnProperty('web_application_firewalls')) {
            for (let artifact of okit_json['web_application_firewalls']) {
                let obj = this.newWebApplicationFirewall(artifact);
                console.info(obj);
            }
        }

        // Virtual Cloud Network Sub Components
        // Dynamic Routing Gateways
        if (okit_json.hasOwnProperty('dynamic_routing_gateways')) {
            for (let artifact of okit_json['dynamic_routing_gateways']) {
                let obj = this.newDynamicRoutingGateway(artifact);
                console.info(obj);
            }
        }
        // Internet Gateways
        if (okit_json.hasOwnProperty('internet_gateways')) {
            for (let artifact of okit_json['internet_gateways']) {
                let obj = this.newInternetGateway(artifact);
                console.info(obj);
            }
        }
        // NAT Gateway
        if (okit_json.hasOwnProperty('nat_gateways')) {
            for (let artifact of okit_json['nat_gateways']) {
                let obj = this.newNATGateway(artifact);
                console.info(obj);
            }
        }
        // Route Tables
        if (okit_json.hasOwnProperty('route_tables')) {
            for (let artifact of okit_json['route_tables']) {
                let obj = this.newRouteTable(artifact);
                console.info(obj);
            }
        }
        // Security Lists
        if (okit_json.hasOwnProperty('security_lists')) {
            for (let artifact of okit_json['security_lists']) {
                let obj = this.newSecurityList(artifact);
                console.info(obj);
            }
        }
        // Service Gateways
        if (okit_json.hasOwnProperty('service_gateways')) {
            for (let artifact of okit_json['service_gateways']) {
                let obj = this.newServiceGateway(artifact);
                console.info(obj);
            }
        }
        // Subnets
        if (okit_json.hasOwnProperty('subnets')) {
            for (let artifact of okit_json['subnets']) {
                let obj = this.newSubnet(artifact);
                console.info(obj);
            }
        }

        // Subnet Subcomponents
        // File Storage Systems
        if (okit_json.hasOwnProperty('file_storage_systems')) {
            for (let artifact of okit_json['file_storage_systems']) {
                let obj = this.newFileStorageSystem(artifact);
                console.info(obj);
            }
        }
        // Instances
        if (okit_json.hasOwnProperty('instances')) {
            for (let artifact of okit_json['instances']) {
                let obj = this.newInstance(artifact);
                console.info(obj);
            }
        }
        // Load Balancers
        if (okit_json.hasOwnProperty('load_balancers')) {
            for (let artifact of okit_json['load_balancers']) {
                let obj = this.newLoadBalancer(artifact);
                console.info(obj);
            }
        }
        console.groupEnd();
    }

    /*
    ** Draw the JSON Data within this Object as SVG.
     */
    draw() {
        console.groupCollapsed('Drawing SVG Canvas');
        // Display Json
        displayOkitJson();
        // Clear existing
        //clearCanvas();
        // New canvas
        let width = 0;
        let height = 0;
        for (let compartment of this.compartments) {
            let dimensions = compartment.getDimensions();
            width = Math.max(width, dimensions.width);
            height = Math.max(height, dimensions.height);
        }
        newCanvas('canvas-wrapper', width, height);

        //console.info(JSON.stringify(this, null, 2));
        console.info(this);

        // Draw Compartments
        for (let compartment of this.compartments) {
            compartment.draw();
        }

        // Draw Compartment Sub Components
        // Virtual Cloud Networks
        for (let virtual_cloud_network of this.virtual_cloud_networks) {
            virtual_cloud_network.draw();
        }
        // Block Storage Volumes
        for (let block_storage_volume of this.block_storage_volumes) {
            block_storage_volume.draw();
        }
        // Object Storage Buckets
        for (let object_storage_bucket of this.object_storage_buckets) {
            object_storage_bucket.draw();
        }
        // Autonomous Databases
        for (let autonomous_database of this.autonomous_databases) {
            autonomous_database.draw();
        }

        // Draw Virtual Cloud Network Sub Components
        // Internet Gateways
        for (let internet_gateway of this.internet_gateways) {
            internet_gateway.draw();
        }
        // NAT Gateways
        for (let nat_gateway of this.nat_gateways) {
            nat_gateway.draw();
        }
        // Service Gateways
        for (let service_gateway of this.service_gateways) {
            service_gateway.draw();
        }
        // Dynamic Routing Gateways
        for (let dynamic_routing_gateway of this.dynamic_routing_gateways) {
            dynamic_routing_gateway.draw();
        }
        // FastConnects
        for (let fast_connect of this.fast_connects) {
            fast_connect.draw();
        }
        // Route Tables
        for (let route_table of this.route_tables) {
            route_table.draw();
        }
        // Security Lists
        for (let security_list of this.security_lists) {
            security_list.draw();
        }
        // Subnets
        for (let subnet of this.subnets) {
            subnet.draw();
        }

        // Draw Subnet Sub Components
        // File Storage System
        for (let file_storage_system of this.file_storage_systems) {
            file_storage_system.draw();
        }
        // Containers
        for (let container of this.containers) {
            container.draw();
        }
        // Instances
        for (let instance of this.instances) {
            instance.draw();
        }
        // Load Balancers
        for (let load_balancer of this.load_balancers) {
            load_balancer.draw();
        }

        // Resize Main Canvas if required
        let canvas_svg = d3.select("#canvas-svg");
        console.info('Canvas Width   : ' + canvas_svg.attr('width'));
        console.info('Canvas Height  : ' + canvas_svg.attr('height'));
        console.info('Canvas viewBox : ' + canvas_svg.attr('viewBox'));
        $("#canvas-svg").children("svg [data-type='" + compartment_artifact + "']").each(function () {
            console.info('Width   : ' + this.getAttribute('width'));
            console.info('Height  : ' + this.getAttribute('height'));
            console.info('viewBox : ' + this.getAttribute('viewBox'));
            canvas_svg.attr('width', Math.max(Number(canvas_svg.attr('width')), Number(this.getAttribute('width'))));
            canvas_svg.attr('height', Math.max(Number(canvas_svg.attr('height')), Number(this.getAttribute('height'))));
        });
        console.info('Canvas Width   : ' + canvas_svg.attr('width'));
        console.info('Canvas Height  : ' + canvas_svg.attr('height'));
        console.info('Canvas viewBox : ' + canvas_svg.attr('viewBox'));
        console.groupEnd();
    }

    /*
    ** New Artifact Processing
     */

    // Autonomous Database
    newAutonomousDatabase(data, parent=null) {
        console.info('New Autonomous Database');
        this.autonomous_databases.push(new AutonomousDatabase(data, this, parent));
        return this.autonomous_databases[this.autonomous_databases.length - 1];
    }

    // Block Storage Volume
    newBlockStorageVolume(data, parent=null) {
        console.info('New Block Storage Volume');
        this.block_storage_volumes.push(new BlockStorageVolume(data, this, parent));
        return this.block_storage_volumes[this.block_storage_volumes.length - 1];
    }

    // Compartment
    newCompartment(data = {}, parent=null) {
        this['compartments'].push(new Compartment(data, this, parent));
        return this['compartments'][this['compartments'].length - 1];
    }

    // Dynamic Routing Gateway
    newDynamicRoutingGateway(data, parent=null) {
        console.info('New Dynamic Routing Gateway');
        for (let gateway of this.dynamic_routing_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single Dynamic Routing Gateway peer VCN
                alert('The maximum limit of 1 for Dynamic Routing Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                return {error: 'Service Gateway Already Exists.'};
            }
        }
        this['dynamic_routing_gateways'].push(new DynamicRoutingGateway(data, this, parent));
        return this['dynamic_routing_gateways'][this['dynamic_routing_gateways'].length - 1];
    }

    // FastConnect
    newFastConnect(data, parent=null) {
        console.info('New FastConnect');
        this['fast_connects'].push(new FastConnect(data, this, parent));
        return this['fast_connects'][this['fast_connects'].length - 1];
    }

    // File Storage System
    newFileStorageSystem(data, parent=null) {
        console.info('New File Storage System');
        this.file_storage_systems.push(new FileStorageSystem(data, this, parent));
        return this.file_storage_systems[this.file_storage_systems.length - 1];
    }

    // Instance
    newInstance(data, parent=null) {
        console.info('New Instance');
        this.instances.push(new Instance(data, this, parent));
        return this.instances[this.instances.length - 1];
    }

    // Internet Gateway
    newInternetGateway(data, parent=null) {
        console.info('New Internet Gateway');
        for (let gateway of this.internet_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single Internet Gateway peer VCN
                alert('The maximum limit of 1 for Internet Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                return {error: 'Service Gateway Already Exists.'};
            }
        }
        this['internet_gateways'].push(new InternetGateway(data, this, parent));
        return this['internet_gateways'][this['internet_gateways'].length - 1];
    }

    // Load Balancer
    newLoadBalancer(data, parent=null) {
        console.info('New Load Balancer');
        this.load_balancers.push(new LoadBalancer(data, this, parent));
        return this.load_balancers[this.load_balancers.length - 1];
    }

    // NAT Gateway
    newNATGateway(data, parent=null) {
        console.info('New NAT Gateway');
        for (let gateway of this.nat_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single NAT Gateway peer VCN
                alert('The maximum limit of 1 for NAT Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                return {error: 'Service Gateway Already Exists.'};
            }
        }
        this['nat_gateways'].push(new NATGateway(data, this, parent));
        return this['nat_gateways'][this['nat_gateways'].length - 1];
    }

    // Object Storage Bucket
    newObjectStorageBucket(data, parent=null) {
        console.info('New Object Storage Bucket');
        this.object_storage_buckets.push(new ObjectStorageBucket(data, this, parent));
        return this.object_storage_buckets[this.object_storage_buckets.length - 1];
    }

    // Route Table
    newRouteTable(data, parent=null) {
        console.info('New Route Table');
        this.route_tables.push(new RouteTable(data, this, parent));
        return this.route_tables[this.route_tables.length - 1];
    }

    // Security List
    newSecurityList(data, parent=null) {
        console.info('New Security List');
        this.security_lists.push(new SecurityList(data, this, parent));
        return this.security_lists[this.security_lists.length - 1];
    }

    // Service Gateway
    newServiceGateway(data, parent=null) {
        console.info('New Service Gateway');
        for (let gateway of this.service_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single Service Gateway peer VCN
                alert('The maximum limit of 1 for Service Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                return {error: 'Service Gateway Already Exists.'};
            }
        }
        this['service_gateways'].push(new ServiceGateway(data, this, parent));
        return this['service_gateways'][this['service_gateways'].length - 1];
    }

    // Subnet
    newSubnet(data, parent=null) {
        console.info('New Subnet');
        this['subnets'].push(new Subnet(data, this, parent));
        return this['subnets'][this['subnets'].length - 1];
    }

    // Virtual Cloud Network
    newVirtualCloudNetwork(data, parent=null) {
        console.info('New Virtual Cloud Network');
        this['virtual_cloud_networks'].push(new VirtualCloudNetwork(data, this, parent));
        return this['virtual_cloud_networks'][this['virtual_cloud_networks'].length - 1];
    }

    // Fragment
    newFragment(data, parent=null) {
        console.info('New Fragment');
        return new Fragment(data, this, parent);
    }

    /*
    ** Get Artifact Processing
     */

    // Block Storage Volume
    getBlockStorageVolume(id='') {
        for (let artifact of this.block_storage_volumes) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    // Compartment
    getCompartment(id='') {
        for (let artifact of this.compartments) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    // Instance
    getInstance(id='') {
        for (let artifact of this.instances) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    getRouteTable(id='') {
        for (let artifact of this.route_tables) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    getSecurityList(id='') {
        for (let artifact of this.security_lists) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    getSubnet(id='') {
        for (let artifact of this.subnets) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    getVirtualCloudNetwork(id='') {
        for (let artifact of this.virtual_cloud_networks) {
            if (artifact.id === id) {
                return artifact;
            }
        }
        return {};
    }

    getVcn(id='') {
        return this.getVirtualCloudNetwork(id);
    }

    /*
    ** Delete Artifact Processing
     */

    // Autonomous Database
    deleteAutonomousDatabase(id) {
        for (let i = 0; i < this.autonomous_databases.length; i++) {
            if (this.autonomous_databases[i].id === id) {
                this.autonomous_databases[i].delete();
                this.autonomous_databases.splice(i, 1);
                break;
            }
        }
    }

    // Block Storage Volume
    deleteBlockStorageVolume(id) {
        for (let i = 0; i < this.block_storage_volumes.length; i++) {
            if (this.block_storage_volumes[i].id === id) {
                this.block_storage_volumes[i].delete();
                this.block_storage_volumes.splice(i, 1);
                break;
            }
        }
    }

    // Compartment
    deleteCompartment(id) {
        for (let i = 0; i < this.compartments.length; i++) {
            if (this.compartments[i].id === id) {
                this.compartments[i].delete();
                this.compartments.splice(i, 1);
                break;
            }
        }
    }

    // Dynamic Routing Gateway
    deleteDynamicRoutingGateway(id) {
        for (let i = 0; i < this.dynamic_routing_gateways.length; i++) {
            if (this.dynamic_routing_gateways[i].id === id) {
                this.dynamic_routing_gateways[i].delete();
                this.dynamic_routing_gateways.splice(i, 1);
                break;
            }
        }
    }

    deleteFastConnect(id) {
        for (let i = 0; i < this.fast_connects.length; i++) {
            if (this.fast_connects[i].id === id) {
                this.fast_connects[i].delete();
                this.fast_connects.splice(i, 1);
                break;
            }
        }
    }

    // File Storage System
    deleteFileStorageSystem(id) {
        for (let i = 0; i < this.file_storage_systems.length; i++) {
            if (this.file_storage_systems[i].id === id) {
                this.file_storage_systems[i].delete();
                this.file_storage_systems.splice(i, 1);
                break;
            }
        }
    }

    // Instance
    deleteInstance(id) {
        for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].id === id) {
                this.instances[i].delete();
                this.instances.splice(i, 1);
                break;
            }
        }
    }

    // Internet Gateway
    deleteInternetGateway(id) {
        for (let i = 0; i < this.internet_gateways.length; i++) {
            if (this.internet_gateways[i].id === id) {
                this.internet_gateways[i].delete();
                this.internet_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Load Balancer
    deleteLoadBalancer(id) {
        for (let i = 0; i < this.load_balancers.length; i++) {
            if (this.load_balancers[i].id === id) {
                this.load_balancers[i].delete();
                this.load_balancers.splice(i, 1);
                break;
            }
        }
    }

    // NAT Gateway
    deleteNATGateway(id) {
        for (let i = 0; i < this.nat_gateways.length; i++) {
            if (this.nat_gateways[i].id === id) {
                this.nat_gateways[i].delete();
                this.nat_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Object Storage Bucket
    deleteObjectStorageBucket(id) {
        for (let i = 0; i < this.object_storage_buckets.length; i++) {
            if (this.object_storage_buckets[i].id === id) {
                this.object_storage_buckets[i].delete();
                this.object_storage_buckets.splice(i, 1);
                break;
            }
        }
    }

    // Route Table
    deleteRouteTable(id) {
        for (let i = 0; i < this.route_tables.length; i++) {
            if (this.route_tables[i].id === id) {
                this.route_tables[i].delete();
                this.route_tables.splice(i, 1);
                break;
            }
        }
    }

    // Security List
    deleteSecurityList(id) {
        for (let i = 0; i < this.security_lists.length; i++) {
            if (this.security_lists[i].id === id) {
                this.security_lists[i].delete();
                this.security_lists.splice(i, 1);
                break;
            }
        }
    }

    // Service Gateway
    deleteServiceGateway(id) {
        for (let i = 0; i < this.service_gateways.length; i++) {
            if (this.service_gateways[i].id === id) {
                this.service_gateways[i].delete();
                this.service_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Subnet
    deleteSubnet(id) {
        for (let i = 0; i < this.subnets.length; i++) {
            if (this.subnets[i].id === id) {
                this.subnets[i].delete();
                this.subnets.splice(i, 1);
                break;
            }
        }
    }

    // Virtual Cloud Network
    deleteVirtualCloudNetwork(id) {
        for (let i = 0; i < this.virtual_cloud_networks.length; i++) {
            if (this.virtual_cloud_networks[i].id === id) {
                this.virtual_cloud_networks[i].delete();
                this.virtual_cloud_networks.splice(i, 1);
                break;
            }
        }
    }
}
