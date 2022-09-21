<template>
  <v-card
      class="mx-auto my-12"
      elevation="5"
      max-width="800" 
  >

  <v-img
        class="align-end text-white"
        height="200"
        src="data:image/jpeg;base64,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"
        cover
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      >
        <v-card-title>About the Creator</v-card-title>
      </v-img>

    <v-card-title>Melchizedek B. Recalde</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">
        4th Year Student • BSIT • T.I.P. Manila
      </div>

      <div class="text-justify">Melchizedek Recalde is a young Filipino student who studies Information Technology at Technological Institute of the Philippines - Manila. His school program and his curiosity to technology brought him to the Microsoft Learn Student Ambassadors Program. He believes that the learning that you got should never stop in yourself. It should be shared from one person to another. In this way, we can make this world a technology-driven one.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Other Information</v-card-title>

    <v-card-text>
      <v-chip-group
        color="teal accent-2 white--text"
        column
      >
        <v-chip
            @click="show1 = !show1"
        >School</v-chip>

        <v-chip
            @click="show2 = !show2"
        >Program</v-chip>

        <v-chip
            @click="show3 = !show3"
        >Skills</v-chip>

        <v-expand-transition>
        <div v-show="show1" class="text-justify">

            <v-card-text>
                On February 8, 1962, a group of educators headed by Engineer Demetrio A. 
                Quirino, Jr. and Dr. Teresita U. Quirino established the TECHNOLOGICAL INSTITUTE 
                OF THE PHILIPPINES (T.I.P.) as a private non-sectarian stock school in Manila.
                T.I.P. laid down its objective based on its founders’ vision: 1) to maintain 
                high standards of instruction; 2) to bring within the reach of the masses the 
                blessings of higher education; and 3) to cooperate with the government in the 
                implementation of its economic and social amelioration programs.
                <br><br>
                <a href="https://tip.edu.ph/">Read more at the 
                Official T.I.P. Website</a>
            </v-card-text>
        </div>
        </v-expand-transition>

        <v-expand-transition>
        <div v-show="show2" class="text-justify">

            <v-card-text>
                The Information Technology program is focused on the utilization of 
                computers and computer software to plan, install, customize, operate, manage, 
                administer and maintain information technology systems.
                The program prepares students to be IT professionals who are well versed 
                in application installation, operation, development, maintenance and 
                administration; as well as familiar with hardware installation, operation, and 
                maintenance.
                Accredited by the Computing Accreditation Commission (CAC) of ABET 
                (www.abet.org)
                Accredited by PCS Philippine Information and Computing Accreditation 
                Board (PICAB)
                Accredited by Seoul Accord
                Recognition:
                From CHED: Center of Excellence (COE) for Information Technology 
                Education (ITE)
                From PACUCOA: Level IV Accredited Status in Information Technology
            </v-card-text>
        </div>
        </v-expand-transition>

        <v-expand-transition>
        <div v-show="show3" class="text-justify">

            <v-card-text>
                Cloud computing is experiencing explosive growth, as cloud developers are 
                needed for all businesses who wish to migrate their environments, storage, and 
                digital assets to the cloud. In fact, according to LogicMonitor, 87% of global IT 
                decision makers agree that the COVID-19 pandemic has accelerated cloud migration 
                for most organizations. In addition, once migrated, businesses will need 
                programmers familiar with the technology necessary to work effectively with 
                cloud-native applications. And, as businesses rely more heavily on data science, 
                machine learning, and artificial intelligence, work in the cloud becomes even 
                more important since algorithms and models consume significant resources. The 
                result of these business transitions and needs is that cloud engineers and 
                developers, as well as cloud-savvy programmers, are in high demand.
            </v-card-text>
        </div>
        </v-expand-transition>

      </v-chip-group>
    </v-card-text>

  </v-card>
</template>

<script>
import {ref} from 'vue'

const selection = ref(1)
</script>

