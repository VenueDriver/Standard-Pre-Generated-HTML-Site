module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-credentials.json'), // Read the file
    responsive_images: {
      build: {
        options: {
          engine: 'im',
          quality: 80,
          sizes: [
            // Original sizes, based on a 1200px-wide layout.
            { name: '1200px', width: 1200 },
            { name: '1000px', width: 1000 },
            { name: '780px', width: 780 },
            { name: '580px', width: 580 },
            { name: '560px', width: 560 },
            { name: '350px', width: 350 },
            { name: '300px', width: 300 },
            { name: '268px', width: 268 },
            { name: '250px', width: 250 },

            // 2x
            { name: '2400px', width: 2400 },
            { name: '2000px', width: 2000 },
            { name: '1560px', width: 1560 },
            { name: '1160px', width: 1160 },
            { name: '1120px', width: 1120 },
            { name: '700px', width: 700 },
            { name: '600px', width: 600 },
            { name: '536px', width: 536 },
            { name: '500px', width: 500 },

            // Scaled to 0.8 for the 960px-wide layout, because 1200 * 0.8 = 960
            { name: '960px', width: 960},
            { name: '800px', width: 800},
            { name: '624px', width: 624},
            { name: '464px', width: 464},
            { name: '560px', width: 448},
            { name: '448px', width: 280},
            { name: '240px', width: 240},
            { name: '214px', width: 214},
            { name: '200px', width: 200},

            // The 2x sizes for the 960 layout.  (original_width * 0.8 * 2)
            { name: '1920px', width: 1920},
            { name: '1600px', width: 1600},
            { name: '1248px', width: 1248},
            { name: '928px', width: 928},
            { name: '896px', width: 896},
            { name: '560px', width: 560},
            { name: '480px', width: 480},
            { name: '429px', width: 429},
            { name: '400px', width: 400}
          ]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpg,gif,png}'],
          cwd: 'content/assets/images/responsive',
          dest: '_site/assets/images/responsive'
        }]
      }
    },


    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'us-west-1',
        progress: 'progressBar',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads

      },
      staging: {
        options: {
          bucket: 'staging.herringboneeats.com',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: '_site', src: ['**'], dest: '/', exclude: '/assets', action: 'upload'},
          {expand: true, cwd: '_site/assets', src: ['**'], dest: '/assets', action: 'upload',
            params: {CacheControl: '2592000'}}, /* 30 days, in seconds. */
        ]
      },
      production: {
        options: {
          bucket: 'herringboneeats.com',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: '_site', src: ['**'], dest: '/', exclude: '/assets', action: 'upload'},
          {expand: true, cwd: '_site/assets', src: ['**'], dest: '/assets', action: 'upload',
            params: {CacheControl: '2592000'}}, /* 30 days, in seconds. */
        ]
      }
    },
    shell: {
      jekyllBuild : {
        command : 'jekyll build'
      },
      jekyllServe : {
        command : 'jekyll serve'
      },
      responsiveImages : {
        command : 'jekyll serve'
      }
    },
    connect: {
      server: {
        options: {
          base: '_site/',
          port: 4000
        }
      }
    },
    watch: {
      js: {
        files: ['content/javascripts/*.js'],
        tasks: ['concat', 'uglify', 'shell:jekyllBuild']
      },
      css: {
        files: ['content/stylesheets/*.css'],
        tasks: ['concat', 'cssmin', 'shell:jekyllBuild']
      },
      jekyll: {
        files: [
          'content/*.html',
          'content/resources/*.html',
          'content/resources/**/*.html',
          'content/_data/**/*.yml',
          'content/_includes/*.html',
          'content/_layouts/*.html',
          'content/_config.yml',
          'content/mobile/index.html',
          'content/images/**/*.*'
        ],
        tasks: ['shell:jekyllBuild']
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('serve', [
    'shell:jekyllBuild',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', ['serve']);
};
