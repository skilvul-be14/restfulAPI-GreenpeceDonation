# Dokumentasi Backend Endpoint

## link API : https://restfulapi-greenpecedonation-production.up.railway.app/

## Endpoint User

semua endpoint user hanya bisa diakses oleh admin

- api/users **(GET METHOD)** <br>
  untuk mengambil data user
- api/users/id **(GET METHOD)** <br>
  untuk mengambil data berdasarkan id user
- api/users/id **(PATCH METHOD)** <br>
  untuk mengubah data user berdasarkan id user
- api/users/id **(DELETE METHOD)** <br>
  untuk menghapus data user berdasarkan id user

## Endpoint Authentication & Authorization

- api/login **(POST METHOD)** <br>
  untuk melakukan login
- api/register **(POST METHOD)** <br>
  untuk melakukan register
- api/logout **(DELETE METHOD)** <br>
  untuk melakukan logout

## Endpoint Event

- api/events **(POST METHOD)** <br>
  untuk menambahkan event (hanya dapat dilakukan oleh admin)
- api/events **(GET METHOD)** <br>
  untuk melihat list event
- api/events/id **(GET METHOD)** <br>
  untuk melihat detail event
- api/events/id **(PATCH METHOD)** <br>
  untuk mengedit event (hanya dapat dilakukan oleh admin)
- api/events/id **(DELETE METHOD)**
  untuk menghapus event (hanya dapat dilakukan oleh admin)

## Endpoint Donation

- api/donations **(POST METHOD)** <br>
  untuk menambahkan donasi
- api/donations **(GET METHOD)** <br>
  untuk melihat semua donasi yang masuk dalam database (hanya dapat dilakukan oleh admin)
- api/donations/id **(GET METHOD)** <br>
  untuk melihat detail donasi (hanya dapat dilakukan oleh admin)
- api/donationsbyuser **(GET METHOD)** <br>
  untuk melihat histori donasi yang pernah dilakukan user
- api/donations/id **(PATCH METHOD)** <br>
  untuk mengedit data donasi (hanya dapat dilakukan oleh admin)
- api/donations/id **(DELETE METHOD)** <br>
  untuk menghapus data donasi (hanya dapat dilakukan oleh admin)
