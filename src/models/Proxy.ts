export interface Proxy{
    server_name: string;
    server_port: string;
    proxy_pass: {
        protocol: string;
        ip:string;
        port: string;
    }
}
