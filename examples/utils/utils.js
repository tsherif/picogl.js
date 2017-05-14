///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////////////////

(function() {
    var translateMat = mat4.create();
    var rotateXMat = mat4.create();
    var rotateYMat = mat4.create();
    var rotateZMat = mat4.create();
    var scaleMat = mat4.create();

    var zeros = [0, 0, 0];
    var ones = [1, 1, 1];

    var NUM_TIMING_SAMPLES = 60;

    var cpuTimeSum = 0;
    var gpuTimeSum = 0;
    var timeSampleCount = NUM_TIMING_SAMPLES - 1;

    window.utils = {
        xformMatrix: function xformMatrix(xform, translate, rotate, scale) {
            translate = translate || zeros;
            rotate = rotate || zeros;
            scale = scale || ones;

            mat4.fromTranslation(translateMat, translate);
            mat4.fromXRotation(rotateXMat, rotate[0]);
            mat4.fromYRotation(rotateYMat, rotate[1]);
            mat4.fromZRotation(rotateZMat, rotate[2]);
            mat4.fromScaling(scaleMat, scale);

            mat4.multiply(xform, rotateXMat, scaleMat);
            mat4.multiply(xform, rotateYMat, xform);
            mat4.multiply(xform, rotateZMat, xform);
            mat4.multiply(xform, translateMat, xform);
        },

        loadCubemapImages: function loadCubeMapImages(urls, ok) {
          var numImages = 6;
          
          var negX = new Image();
          var posX = new Image();
          var negY = new Image();
          var posY = new Image();
          var negZ = new Image();
          var posZ = new Image();

          function onload() {
            if (--numImages === 0) {
              ok(negX, posX, negY, posY, negZ, posZ);
            }
          }

          negX.onload = onload;
          posX.onload = onload;
          negY.onload = onload;
          posY.onload = onload;
          negZ.onload = onload;
          posZ.onload = onload;

          negX.src = urls.negX;
          posX.src = urls.posX;
          negY.src = urls.negY;
          posY.src = urls.posY;
          negZ.src = urls.negZ;
          posZ.src = urls.posZ;
        },

        createBox: function createBox(options) {
          options = options || {};

          var dimensions = options.dimensions || [1, 1, 1];
          var position = options.position || [-dimensions[0] / 2, -dimensions[1] / 2, -dimensions[2] / 2];
          var x = position[0];
          var y = position[1];
          var z = position[2];
          var width = dimensions[0];
          var height = dimensions[1];
          var depth = dimensions[2];

          var fbl = {x: x,         y: y,          z: z + depth};
          var fbr = {x: x + width, y: y,          z: z + depth};
          var ftl = {x: x,         y: y + height, z: z + depth};
          var ftr = {x: x + width, y: y + height, z: z + depth};
          var bbl = {x: x,         y: y,          z: z };
          var bbr = {x: x + width, y: y,          z: z };
          var btl = {x: x,         y: y + height, z: z };
          var btr = {x: x + width, y: y + height, z: z };

          var positions = new Float32Array([
            //front
            fbl.x, fbl.y, fbl.z,
            fbr.x, fbr.y, fbr.z,
            ftl.x, ftl.y, ftl.z,
            ftl.x, ftl.y, ftl.z,
            fbr.x, fbr.y, fbr.z,
            ftr.x, ftr.y, ftr.z,

            //right
            fbr.x, fbr.y, fbr.z,
            bbr.x, bbr.y, bbr.z,
            ftr.x, ftr.y, ftr.z,
            ftr.x, ftr.y, ftr.z,
            bbr.x, bbr.y, bbr.z,
            btr.x, btr.y, btr.z,

            //back
            fbr.x, bbr.y, bbr.z,
            bbl.x, bbl.y, bbl.z,
            btr.x, btr.y, btr.z,
            btr.x, btr.y, btr.z,
            bbl.x, bbl.y, bbl.z,
            btl.x, btl.y, btl.z,

            //left
            bbl.x, bbl.y, bbl.z,
            fbl.x, fbl.y, fbl.z,
            btl.x, btl.y, btl.z,
            btl.x, btl.y, btl.z,
            fbl.x, fbl.y, fbl.z,
            ftl.x, ftl.y, ftl.z,

            //top
            ftl.x, ftl.y, ftl.z,
            ftr.x, ftr.y, ftr.z,
            btl.x, btl.y, btl.z,
            btl.x, btl.y, btl.z,
            ftr.x, ftr.y, ftr.z,
            btr.x, btr.y, btr.z,

            //bottom
            bbl.x, bbl.y, bbl.z,
            bbr.x, bbr.y, bbr.z,
            fbl.x, fbl.y, fbl.z,
            fbl.x, fbl.y, fbl.z,
            bbr.x, bbr.y, bbr.z,
            fbr.x, fbr.y, fbr.z,
          ]);

          var uvs = new Float32Array([
            //front
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            //right
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            //back
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            //left
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            //top
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            //bottom
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1
          ]);

          var normals = new Float32Array(positions.length);
          var i, count;
          var ni;

          for (i = 0, count = positions.length / 3; i < count; i++) {
            ni = i * 3;        

            normals[ni] = parseInt(i / 6, 10) === 1 ? 1 : 
                         parseInt(i / 6, 10) === 3 ? -1 : 0; 

            normals[ni+1] = parseInt(i / 6, 10) === 4 ? 1 : 
                           parseInt(i / 6, 10) === 5 ? -1 : 0; 

            normals[ni+2] = parseInt(i / 6, 10) === 0 ? 1 : 
                           parseInt(i / 6, 10) === 2 ? -1 : 0; 

          }

          return {
            positions: positions,
            normals: normals,
            uvs: uvs
          };

        },

        createSphere: function createSphere(options) {
          options = options || {};

          var long_bands = options.long_bands || 32;
          var lat_bands = options.lat_bands || 32;
          var radius = options.radius || 1;
          var lat_step = Math.PI / lat_bands;
          var long_step = 2 * Math.PI / long_bands;
          var num_positions = long_bands * lat_bands * 4;
          var num_indices = long_bands * lat_bands * 6;
          var lat_angle, long_angle;
          var positions = new Float32Array(num_positions * 3);
          var normals = new Float32Array(num_positions * 3);
          var uvs = new Float32Array(num_positions * 2);
          var indices = new Uint16Array(num_indices);
          var x1, x2, x3, x4,
              y1, y2,
              z1, z2, z3, z4,
              u1, u2,
              v1, v2;
          var i, j;
          var k = 0, l = 0;
          var vi, ti;

          for (i = 0; i < lat_bands; i++) {
            lat_angle = i * lat_step;
            y1 = Math.cos(lat_angle);
            y2 = Math.cos(lat_angle + lat_step);
            for (j = 0; j < long_bands; j++) {
              long_angle = j * long_step;
              x1 = Math.sin(lat_angle) * Math.cos(long_angle);
              x2 = Math.sin(lat_angle) * Math.cos(long_angle + long_step);
              x3 = Math.sin(lat_angle + lat_step) * Math.cos(long_angle);
              x4 = Math.sin(lat_angle + lat_step) * Math.cos(long_angle + long_step);
              z1 = Math.sin(lat_angle) * Math.sin(long_angle);
              z2 = Math.sin(lat_angle) * Math.sin(long_angle + long_step);
              z3 = Math.sin(lat_angle + lat_step) * Math.sin(long_angle);
              z4 = Math.sin(lat_angle + lat_step) * Math.sin(long_angle + long_step);
              u1 = 1 - j / long_bands;
              u2 = 1 - (j + 1) / long_bands;
              v1 = 1 - i / lat_bands;
              v2 = 1 - (i + 1) / lat_bands;
              vi = k * 3;
              ti = k * 2;

              positions[vi] = x1 * radius; 
              positions[vi+1] = y1 * radius; 
              positions[vi+2] = z1 * radius; //v0

              positions[vi+3] = x2 * radius; 
              positions[vi+4] = y1 * radius; 
              positions[vi+5] = z2 * radius; //v1

              positions[vi+6] = x3 * radius; 
              positions[vi+7] = y2 * radius; 
              positions[vi+8] = z3 * radius; // v2


              positions[vi+9] = x4 * radius; 
              positions[vi+10] = y2 * radius; 
              positions[vi+11] = z4 * radius; // v3

              normals[vi] = x1;
              normals[vi+1] = y1; 
              normals[vi+2] = z1;

              normals[vi+3] = x2;
              normals[vi+4] = y1; 
              normals[vi+5] = z2;

              normals[vi+6] = x3;
              normals[vi+7] = y2; 
              normals[vi+8] = z3;
              
              normals[vi+9] = x4;
              normals[vi+10] = y2; 
              normals[vi+11] = z4;

              uvs[ti] = u1; 
              uvs[ti+1] = v1; 
              
              uvs[ti+2] = u2; 
              uvs[ti+3] = v1;
              
              uvs[ti+4] = u1;
              uvs[ti+5] = v2; 
              
              uvs[ti+6] = u2;
              uvs[ti+7] = v2;

              indices[l    ] = k;
              indices[l + 1] = k + 1;
              indices[l + 2] = k + 2;
              indices[l + 3] = k + 2;
              indices[l + 4] = k + 1;
              indices[l + 5] = k + 3;

              k += 4;
              l += 6;
            }
          }

          return {
            positions: positions,
            normals: normals,
            uvs: uvs,
            indices: indices
          };
        },

        addTimerElement: function() {
            this.timerDiv = document.createElement("div")
            this.timerDiv.id = "timer";
            this.cpuTimeElement = document.createElement("div");
            this.gpuTimeElement = document.createElement("div");
            this.timerDiv.appendChild(this.cpuTimeElement);
            this.timerDiv.appendChild(this.gpuTimeElement);
            document.body.appendChild(this.timerDiv);
        },

        updateTimerElement(cpuTime, gpuTime) {
            cpuTimeSum += cpuTime;
            gpuTimeSum += gpuTime;
            ++timeSampleCount;

            if (timeSampleCount === NUM_TIMING_SAMPLES) {
                var cpuTimeAve = cpuTimeSum / NUM_TIMING_SAMPLES;
                var gpuTimeAve = gpuTimeSum / NUM_TIMING_SAMPLES;
                this.cpuTimeElement.innerText = "CPU time: " + cpuTimeAve.toFixed(3) + "ms";
                if (gpuTimeAve > 0) {
                    this.gpuTimeElement.innerText = "GPU time: " + gpuTimeAve.toFixed(3) + "ms";
                } else {
                    this.gpuTimeElement.innerText = "GPU time: (Unavailable)";
                }

                cpuTimeSum = 0;
                gpuTimeSum = 0;
                timeSampleCount = 0;
            }
        }
    }

})();
