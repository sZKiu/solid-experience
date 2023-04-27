/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require( 'fs' );
const path = require( 'path' );
const jsonServer = require( 'json-server' );
const login = require( './login' );
const refreshToken = require( './refreshToken' );
const logout = require( './logout' );
const forgotPassword = require( './forgot-password' );
const assignRoles = require( './assignRolesController' );
const permissions = require( './permissions' );
const server = jsonServer.create();
const router = jsonServer.router( path.resolve( __dirname, 'db.json' ) );
const middlewares = jsonServer.defaults();
server.use( middlewares );
server.use( jsonServer.bodyParser );

server.use( jsonServer.rewriter( {
    '/api/*': '/$1',
    '/auth/login': '/super-admin-login',
    '/auth/refresh-token': '/refresh-token',
    '/auth/account': '/users',
    '/auth/logout': '/logout',
    '/auth/forgot-password': '/forgot-password',
    '/auth/login?provider=local': '/super-admin-login',
    '/auth/permissions': '/permissions',
    '/test/category': '/category',
    '/test/product': '/product',
    '/test/dou': '/dou',
} ) );

server.put( '/users/assign-role/:userId', assignRoles );

router.render = ( req, res ) =>
{
    res.json( {
        data: res.locals.data,
    } );
};

server.post( '/category', ( req, res, next ) =>
{
    if ( !req.body.title || typeof req.body.title !== 'string' ||
        !req.body.enable || typeof req.body.enable !== 'boolean' )
    {
        return res.status( 400 ).json( { error: 'Datos inválidos' } );
    }
    next();
} );

server.post( '/product', ( req, res, next ) =>
{
    if ( !req.body.title || typeof req.body.title !== 'string' ||
    req.body.price === undefined || typeof req.body.price !== 'number' ||
    !req.body.enable || typeof req.body.enable !== 'boolean' || typeof req.body.category !== 'object' || !req.body.category.title || typeof req.body.category.title !== 'string' || !req.body.category.enable || typeof req.body.category.enable !== 'boolean' )
    {
        return res.status( 400 ).json( { error: 'Datos inválidos' } );
    }
    next();
} );

server.delete( '/product/:id', ( req, res ) =>
{
    const { id } = req.params;

    const data = fs.readFileSync( 'db.json' );
    const db = JSON.parse( data );

    let categoryName;

    db.product = db.product.filter( ( prod ) =>
    {
        if ( prod.id == id ) { categoryName = prod.category.title; }

        return prod.id != id;
    }
    );

    const existCat = db.product.findIndex( ( prod ) => prod.category.title == categoryName );

    if ( existCat === -1 )
    {
        db.category = db.category.filter( ( cat ) => cat.title !== categoryName );
    }

    const newDataStr = JSON.stringify( db );

    fs.writeFileSync( 'db.json', newDataStr );

    return res.sendStatus( 204 );
} );

server.use( login );
server.use( refreshToken );
server.use( permissions );
server.use( logout );
server.use( forgotPassword );
server.use( router );

server.listen( 8090, () =>
{
    // console.log( 'JSON Server is running on port 8090' );
} );
