export default class RestWrapper {
    constructor(bricksAPIRESTNGAdminProjectRestangularService, bricksKernel) {
        this.Restangular = bricksAPIRESTNGAdminProjectRestangularService;
        this.bricksKernel = bricksKernel;
    }

    /**
     * Returns the promise of one resource by URL
     *
     * @param {String} entityName
     * @param {String} url
     *
     * @returns {promise}
     */
    getOne(entityName, url) {
        this.Restangular.setBaseUrl(this.bricksKernel.getProperty('bricks.api.protocol', 'http') + '://' +this. bricksKernel.getProperty('bricks.api.host', '20steps.de') + '/bricks/api/v1.0/' + this.bricksKernel.getProperty('bricks.project.code') + '/');
        return this.Restangular
            .oneUrl(entityName, url)
            .get()
            .then(function (response) {
                return response.data;
            });
    }

    /**
     * Returns the promise of a list of resources
     *
     * @param {Object} params
     * @param {String} entityName
     * @param {String} url
     *
     * @returns {promise}
     */
    getList(params, entityName, url) {
        this.Restangular.setBaseUrl(this.bricksKernel.getProperty('bricks.api.protocol', 'http') + '://' +this. bricksKernel.getProperty('bricks.api.host', '20steps.de') + '/bricks/api/v1.0/' + this.bricksKernel.getProperty('bricks.project.code') + '/');
        return this.Restangular
            .allUrl(entityName, url)
            .getList(params);
    }

    createOne(rawEntity, entityName, url, method) {
        this.Restangular.setBaseUrl(this.bricksKernel.getProperty('bricks.api.protocol', 'http') + '://' +this. bricksKernel.getProperty('bricks.api.host', '20steps.de') + '/bricks/api/v1.0/' + this.bricksKernel.getProperty('bricks.project.code') + '/authenticated/');
        var resource = this.Restangular.oneUrl(entityName, url),
            operation = method ? resource.customOperation(method, null, {}, {}, rawEntity) : resource.customPOST(rawEntity);

        return operation.then(function (response) {
            return response.data;
        });
    }

    updateOne(rawEntity, entityName, url, method) {
        this.Restangular.setBaseUrl(this.bricksKernel.getProperty('bricks.api.protocol', 'http') + '://' +this. bricksKernel.getProperty('bricks.api.host', '20steps.de') + '/bricks/api/v1.0/' + this.bricksKernel.getProperty('bricks.project.code') + '/authenticated/');
        console.log('DEBUG updateOne',rawEntity);
        var resource = this.Restangular.oneUrl(entityName, url),
            operation = method ? resource.customOperation(method, null, {}, {}, rawEntity) : resource.customPUT(rawEntity);

        return operation.then(function (response) {
            return response.data;
        });
    }

    deleteOne(entityName, url) {
        this.Restangular.setBaseUrl(this.bricksKernel.getProperty('bricks.api.protocol', 'http') + '://' +this. bricksKernel.getProperty('bricks.api.host', '20steps.de') + '/bricks/api/v1.0/' + this.bricksKernel.getProperty('bricks.project.code') + '/authenticated/');
        return this.Restangular
        .oneUrl(entityName, url)
            .customDELETE();
    }
}

RestWrapper.$inject = ['bricksAPIRESTNGAdminProjectRestangularService','bricksKernel'];
