#include <stdio.h>
#include "esp_log.h"
#include "iot_button.h"

#define TAG "BOARD"

extern void example_ble_mesh_send_vendor_message_a();
extern void example_ble_mesh_send_vendor_message_b();
extern void example_ble_mesh_send_vendor_message_menu();
extern void example_ble_mesh_send_vendor_message_volume();
extern void example_ble_mesh_send_vendor_message_select();
extern void example_ble_mesh_send_vendor_message_start();

static void button_tap_cb_a(void* arg)
{
    example_ble_mesh_send_vendor_message_a();
}

static void button_tap_cb_b(void* arg)
{
    example_ble_mesh_send_vendor_message_b();
}

static void button_tap_cb_menu(void* arg)
{
    example_ble_mesh_send_vendor_message_menu();
}

static void button_tap_cb_volume(void* arg)
{
    example_ble_mesh_send_vendor_message_volume();
}

static void button_tap_cb_select(void* arg)
{
    example_ble_mesh_send_vendor_message_select();
}

static void button_tap_cb_start(void* arg)
{
    example_ble_mesh_send_vendor_message_start();
}

static void board_button_init(void)
{
    button_handle_t btn_handle_a = iot_button_create(32, 0);
    iot_button_set_evt_cb(btn_handle_a, BUTTON_CB_RELEASE, button_tap_cb_a, "RELEASE");

    button_handle_t btn_handle_b = iot_button_create(33, 0);
    iot_button_set_evt_cb(btn_handle_b, BUTTON_CB_RELEASE, button_tap_cb_b, "RELEASE");

    button_handle_t btn_handle_menu = iot_button_create(13, 0);
    iot_button_set_evt_cb(btn_handle_menu, BUTTON_CB_RELEASE, button_tap_cb_menu, "RELEASE");

    button_handle_t btn_handle_volume = iot_button_create(0, 0);
    iot_button_set_evt_cb(btn_handle_volume, BUTTON_CB_RELEASE, button_tap_cb_volume, "RELEASE");

    button_handle_t btn_handle_select = iot_button_create(27, 0);
    iot_button_set_evt_cb(btn_handle_select, BUTTON_CB_RELEASE, button_tap_cb_select, "RELEASE");

    button_handle_t btn_handle_start = iot_button_create(39, 0);
    iot_button_set_evt_cb(btn_handle_start, BUTTON_CB_RELEASE, button_tap_cb_start, "RELEASE");
}

void board_init(void)
{
    board_button_init();
}