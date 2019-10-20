const gulp = require( 'gulp' )
    , { watch
    , series
    , parallel } = gulp
    , browsersync = require( 'browser-sync' ).create()
    , exec = require( 'child_process' ).exec
    , rimraf = require( 'rimraf' );  // 递归删除文件夹

const SRC_PATH = './src'
    , DIST_PATH = './dist'
    , EXEC_HTML = 'gitbook build'
    , WATCH_DIR = [
        'src/**/*.md'
        , 'src/**/*.css'
    ]
    , DIST_HTML_PATH = `${ DIST_PATH }/html/`
    , CFG = {
        browserSync: {
            server: {
                baseDir: DIST_HTML_PATH // web 路径
            }
            , port: 3100    // 端口
        }
    };
[
            'src/**/*.md'
            , 'src/**/*.css'
        ]
/**
 *  通用 Node.js Process Error 处理
 *  @export
 *  @param  {!Object}   err
 *  @param  {number}    [code=1]    对应process.exit(code)
 */
function processErr( err, code = 1 ) {
    if ( err ) {
        // log.error( err );
        process.exit( code );
    }
}

/**
 *  BrowserSync
 *      浏览器同步测试工具
 *  @export
 *  @param  {Function}  done
 */
function browserSync( done ) {
    browsersync.init( CFG.browserSync );
	done();
}

/**
 *  BrowserSync reload
 *  @param  {Function}  done
 */
function reload( done ) {
    browsersync.reload();
    done();
}

/**
 *  监听 Src
 *  @param  {Function}  done 
 */
function watchSrc( done ) {
    watch( 
        WATCH_DIR
        , series( buildHtml, reload )
    );

    done();
}

/**
 *  build Html
 *  @param  {Function} done
 */
function buildHtml( done ) {
    console.log( 'Starting Build Html...' );

    exec( `${ EXEC_HTML } ${ SRC_PATH } ${ DIST_HTML_PATH }`, function ( err, stdout, stderr ) {
        processErr( err );

        console.log( 'Finished' );
        done();
    } );
}

// 本地编辑模式
exports.dev = series(
    buildHtml
    , browserSync
    , watchSrc
);

// 直接 build html
exports.html = series(
    buildHtml
);