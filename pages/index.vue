<template>
    <div>
        <div class="bg-cover" style="background-image: url('/pattern-bg.png')">
            <div class="container mx-auto flex flex-col justify-center items-center text-center py-8">
                <h1 class="text-3xl text-white">IP Address Tracker</h1>

                <form @submit.prevent="getInfo" class="w-full lg:w-1/2 px-4 mt-8">
                    <div class="flex flex-grow">
                        <label class="flex-grow">
                            <span class="sr-only">IP address or domain</span>
                            <input v-model="ipInput" type="text" class="bg-white rounded-l-lg w-full px-6 py-4" placeholder="Search for any IP address or domain" />
                        </label>
                        <button class="flex justify-center items-center bg-black rounded-r-lg w-16">
                            <img class="" src="/icon-arrow.svg" alt="search"/>
                        </button>
                    </div>
                    
                    <div class="text-left text-red-500 mt-2">
                        <span>{{ error }}</span>
                    </div>
                </form>
            </div>

            <div class="container mx-auto px-4">
                <div class="relative flex flex-col lg:flex-row bg-white rounded-lg shadow-2xl w-full p-2 -mb-24 z-10">
                    <InfoItem label="IP address" :value="ipAddress" :loading="loading"/>
                    <div class="hidden lg:flex items-center">
                        <div class="bg-gray-200 w-1 h-1/2"></div>
                    </div>
                    
                    <InfoItem label="Location" :value="location" :loading="loading"/>
                    <div class="hidden lg:flex items-center">
                        <div class="bg-gray-200 w-1 h-1/2"></div>
                    </div>

                    <InfoItem label="Timezone" :value="timezone" :loading="loading"/>
                    <div class="hidden lg:flex items-center">
                        <div class="bg-gray-200 w-1 h-1/2"></div>
                    </div>

                    <InfoItem label="ISP" :value="isp" :loading="loading"/>
                </div>
            </div>
        </div>

        <div id="map-wrap" class="relative z-0 h-screen">
            <client-only>
                <l-map :zoom="20" :center="[lat, lng]">
                    <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <l-marker :lat-lng="[lat, lng]"></l-marker>
                </l-map>
            </client-only>
        </div>
    </div>
</template>

<script>

import Spinner from "~/components/Spinner";
import InfoItem from "~/pages/InfoItem";

export default {
    components: {InfoItem, Spinner},
    data(){
        return {
            ipInput: '',
            error: 'sfdfsfds',

            ipAddress: '',
            location: '',
            timezone: '',
            isp: '',
            
            lat: 37.4223,
            lng: -122.085,
            
            loading: false,
        }
    },
    methods: {
        async getInfo(){
            try {
                let options = {};
                if(this.ipInput){
                    options = {
                        params: {
                            ip: this.ipInput,
                        },
                    }
                }

                this.loading = true;
                this.error = '';
                const info = await this.$axios.$get('/api/ipInfo', options);
                this.ipAddress = info.ip;
                this.location = `${info.location.city}, ${info.location.region}, ${info.location.country}`;
                this.timezone = `UTC ${info.location.timezone}`;
                this.isp = `UTC ${info.isp}`;
                
                this.lat = info.location.lat;
                this.lng = info.location.lng;

                this.loading = false;
            }catch (err){
                console.error(err);
                this.error = 'Something went wrong! try another query or try later.';
            }
        }
    },
    created() {
        this.getInfo();
    }
}
</script>

