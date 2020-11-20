export interface Proxy{
    server_name: string;
    proxy_pass: {
        protocol: string;
        ip:string;
        port: string;
    }
    
}
